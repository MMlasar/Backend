import { Router } from "express";
import {user, users} from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

const sessionsRouter = Router()


//register
sessionsRouter.post("/register", /* has8char, passport.authenticate( "register", {session:false, failureRedirect: "/api/sessions/badauth" }),*/
passCallBack("regiter"),
 async (req, res, next) => {
    try {
        return res.json({
            statuscode: 401,
            message: "Registered!"
        });
    } catch (error) {
        return next(error);
    }
});


//login
sessionsRouter.post("/login", /*passport.authenticate("login", { session: false, failureRedirect: "/api/sessions/badauth"}),*/ passCallBack("login"),
         async (req, res, next) => {
    try {
        return res
        .cookie("token", req.token,
         { maxAge: 7*24*60*60,
            httpOnly:true,
        })
            .json({
            statuscode: 200,
            message: "Logged in",
        });
    } catch (error) {
        return next(error);  
    }
});


//me
sessionsRouter.post("/", async (req, res, next) => {
    try {
        if (req.session.email) {
            return res.json({
                statuscode: 200,
                message: "session with email: " + req.session.email
            });
        } else {
            const error = new Error("Not Auth");
            error.statuscode = 401;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
});

// signout
sessionsRouter.post("/signout",//passport.authenticate("jwt",{session:false, failureRedirect:"/api/sessions/signout/cb"}),
passCallBack("jwt"),
 async (req, res, next) => {
    try {
        // Limpiar la cookie llamada "token"
        res.clearCookie("token");

        // Responder con un mensaje de éxito
        return res.status(200).json({
            statusCode: 200,
            message: "Signed out!"
        });
    } catch (error) {
        return next(error);
    }
});

//badauth

sessionsRouter.get("/badauth",(req,res,next)=>{
    try {
      return res.json({
        statuscode:401,
        message: "Bad auth"
      })  
    } catch (error) {
        return next(error)
    }
})

//google
sessionsRouter.post("/google", passport.authenticate("google", { scope: ["email", "profile"] })
);

//google-callback
sessionsRouter.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect:"/api/session/badauth"
})
);
async (req, res, next) => {
    try {
        return res.json({
            statuscode: 200,
            message: "Logged in whit google!",
            session: req.session
        });
    } catch (error) {
        return next(error);  
    }
};

//Signout/cd
sessionsRouter.get("/signout/cb",(req,res,next)=>{
    try {
        return res.json({
          statuscode:400,
          message: "Already done"
        })  
      } catch (error) {
          return next(error)
      }
})

export default sessionsRouter