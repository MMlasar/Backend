import service from "../services/users.service.js";

class AuthController {
    constructor(){
        this.service = service;
    }

    register = async ( req, res , next) => {
        const { email, name} = req.body
        await this.service.register({email, name})
        try {
            return res.json({
                statuscode: 201,
                messege: "register!"
            });
        } catch (error) {
            return next(error);
        }
    }; 

    login = async (res, req, next) => {
        try {
            return res.cookie ("token", req.token,{
                maxAge: 60 * 60 *24 * 7,
                httpOnly: true,
            })
        } catch (error) {
            return next(error);
        }
    }
    signout = async (res, req, next) => {
        try {
            return res.clearCookie("token").json({
                statuscode:200,
                messege:"Sined out!",
            });
        } catch (error) {
            return next(error);
        }
    };
    verifyAccount = async (res, req, next) => {
        try {
            const {email, verifiedcode} = req.body
            const user = await service.readByEmail(email);
            if (user.verifiedcode===verifiedcode){
                await service.update(user._id,{ verified: true});
                return res.json({
                    statusCode:200,
                    messege:"VERIFIED USER!"

                })
            }else{
                res.json({
                    statusCode:400,
                    message:"Invalid verified token!"
                })
            }
        } catch (error) {
            next(error);
        }
    }
}

const controller = new AuthController();
const {register, login, signout,verifyAccount} = controller;
export {register,login,signout,verifyAccount};