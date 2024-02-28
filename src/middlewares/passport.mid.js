passport.use("login", new LocalStrategy({ passReqToCallback:true,usernameField:"email"},
    async(req,email,password,done)=>{
        try {
            const user = await users.readByEmail(email)
            if(user) {
                const verify = verifayHash(password,user.password)
                if(verify) {
                    req.session.email = email
                    req.session.role = user.role
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error)
        }
    }
));

