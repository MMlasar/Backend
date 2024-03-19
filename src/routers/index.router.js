/* router General */
import CustomRouter from "./customRouter.js";
//import { Router } from "express"
import apiRouter from "./api/index.router.js";
import viewsRouter from "./views/index.views.js";
import viewsRouter from "./views/index.views.js";

const api = new apiRouter();
const  apiRouter = api.getRouter();
const view = new viewsRouter();
const viewsRouter = views.getRouter();

export default class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouter)
        this.use("/", viewsRouter)
    }
}
