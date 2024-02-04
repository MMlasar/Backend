import { Router } from "express";
import usres from "../../data/fs/user.fs.js"

const userRouter = Router()

userRouter.use("/profile", (req,res,next)=>{
    try {
        const one = usres.readOne("560fce785bb0c56284fcefc3");
        return res.render("profile",{ user: one });
        
    } catch (error) {
        next(error)
        
    }
})

export default userRouter