import { Router } from "express";
import {user, users} from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router()


//register
sessionsRouter.post("/register", has8char, passport.authenticate( "register", {session:false, failureRedirect: "/api/sessions/badauth" }), async (req, res, next) => {
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
sessionsRouter.post("/login", passport.authenticate("login", { session: false, failureRedirect: "/api/sessions/badauth"}), async (req, res, next) => {
    try {
        return res.json({
            statuscode: 200,
            message: "Logged in",
            session: req.session
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

//signout
sessionsRouter.post("/signout",async(req,res,next)=>{
    try {
        if(req.session.email){
            req.session.destroy()
            return res.json({
             statuscode:200,
             message: "Sign out!"
            }) 
        } else {
            const error = new Error("Not Auth");
            error.statuscode = 400;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
})

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


export default sessionsRouter