import { Router } from "express";

const sessionsRouter = Router()

//login
sessionsRouter.post("/login", async(req,res,next)=>{
    try {
        const { email, password } = req.body;
        if (email && password==="hola1234") {
            req.session.email = email;
            req.session.role = "admin"
            return res.json({
                statuscode: 200,
                messeage: " logged in ",
                session: req.session
            })
        }
        const error = new Error ( "Bad Auth" );
        error.statuscode = 401;
        throw error;
    } catch (error) {
      return next(error)  
    }
})

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




export default sessionsRouter