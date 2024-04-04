import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { users } from "../data/mongo/manager.mongo.js";
import { createToken } from "../utils/token.utils.js";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { Cookie } from "express-session";

const { GOOGLE_ID, GOOGLE_CLIENT } = process.env;

passport.use("login", new LocalStrategy({ passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const user = await users.readByEmail(email);
            const verify = verifyHash(password, user.passpord);
            if (user?.verified && verify) {
                req.token = createToken ({_id: user._id, role: user.role});
                return done ( null, user);
            }else{
                return done (null, false , { statuscode: 401 });
            }
        } catch (error) {
            return done(error);
        }
    }
));


passport.use("google", new GoogleStrategy({
    passReqToCallback: true,
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_CLIENT,
    callbackURL: "https://localhost:8080/api/sessions/google/callback"
}, async (req, accessToken, refreshToken, profile, done) => { 
    try {
        let user = await users.readByEmail(profile.id)
        if (!user) {
            user = {
                email: profile.id,
                name: profile.givenName,
                lastname: profile.name.familyname,
                photo: profile.converPhoto,
                password: createHash(profile.id)
            };
            user = await users.create(user);
        }
        req.session.email = profile.id;
        req.session.role = user.role;
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.use(
    "jwt",
     new jwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
        secretOrKey: SECRET,
    },async(payload, done)=>{
        try {
            const user = await users.readByEmail(payload.email)
            if(user){
                user.password = null
                return done(null,user);
                //agrega al objeto de requirimientos una propiedad user con los datos del usario que encontre 
            }else{
                return done(null, false,);
            }
        } catch (error) {
            return done(error)
        }
    })
)

passport.use(
    "regiter",
    new localStorage(
        { passReqToCallback: true , usernameField:"email"},
        async(req,email,password,done)=>{
            try {
                let one = await users.readByEmail(email);
                if(!one) {
                    let data = req.body;
                    data.password = createHash(password);
                    let user = await users.create(data);
                    return done ( null,user);
                }else{
                    return done(null, false,{messages:"Already exists", statuscode: 400 })
                }
            } catch (error) {
                return done ( error)
            }
        }
    )
)

export default passport;
 