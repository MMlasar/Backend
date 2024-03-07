import { error } from "console"
import { verifyToken } from "../utils/token.utils"

export default (req,res,next)=>{
    try {
        const token = req.cookies
        const userData = verifyToken(token)
        if(userData){
            return next(error)
        }else{
            const error = new Error("Bad auth from middleware")
            error.statuscode = 401;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
}