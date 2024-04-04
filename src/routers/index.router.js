/* router General */
import CustomRouter from "./customRouter.js";
//import { Router } from "express"
import apiRouter from "./api/index.router.js";
import viewsRouter from "./views/index.views.js";
import viewsRouter from "./views/index.views.js";
import sendSms from "../utils/sendsms.utils.js";

const api = new apiRouter();
const  apiRouter = api.getRouter();
//const view = new viewsRouter();
//const viewsRouter = views.getRouter();

export default class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouter)
        //this.use("/", viewsRouter)
        this.get( "/sms",async(req, res , next) => {
            try {
                await sendSms("1165003095")
                return res.json({
                    statuscode:200,
                    messege: " enviado"
                })
            } catch (error) {
                return next(error)
            }
        })
    }
}
