import { Router } from "express";
import usres from "../../data/fs/user.fs.js"
import usersRouter from "../api/users.router.js";

const userRouter = Router()

usersRouter.get("/chat",(req,res,next)=>{
    try {
        return res.render("chat", {})
    } catch (error) {
        next(error)
        
    }
})



userRouter.get("/profile", (req,res,next)=>{
    try {
        const one = usres.readOne("560fce785bb0c56284fcefc3");
        return res.render("profile",{ user: one });
        
    } catch (error) {
        next(error)
        
    }
})


export default userRouter