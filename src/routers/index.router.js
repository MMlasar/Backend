/* router General */
import CustomRouter from "./customRouter.js";
//import { Router } from "express"
import apiRouter from "./api/index.router.js";
import viewsRouter from "./views/index.views.js";
import sendSms from "../utils/sendsms.utils.js";

const api = new apiRouter();
const apiRouterInstance = api.getRouter();
const view = new viewsRouter();
const viewsRouterInstance = view.getRouter();

export default class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouterInstance);
        this.use("/", viewsRouterInstance);
        this.get("/sms", async (req, res, next) => {
            try {
                await sendSms("1165003095");
                return res.json({
                    statuscode: 200,
                    message: "enviado"
                });
            } catch (error) {
                return next(error);
            }
        });
    }
}

