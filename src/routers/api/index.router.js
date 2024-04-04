import { fork } from "child_process";

import CustomRouter from "../customRouter.js";
//import usersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";
//import ordersRouter from "./orders.router.js";
//import sessionsRouter from "./session.router.api.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import { products } from "../../data/mongo/manager.mongo.js";
import { fork } from "child_process";
//import commentsRouter from "./comments.router.js";

const product = new ProductsRouter()

 export default class apiRouter extends CustomRouter {
    init() {
        //this.use("/users", usersRouter);
        this.use("/products", product.getRouter());
        //this.use("/orders", passCallBackMid("jwt"), ordersRouter);
        //this.use("/sessions", sessionsRouter);
        //this.use("/comments", commentsRouter);
        this.read("/sum", ["PUBLIC"], async (req , res )=> {
            try {
                const child = fork(".src/utils/sum.util.js");
                child.send("start");
                child.on("message",(result) => res.success200(result));
            } catch (error) {
                return next(error)
            }
        });
    
    }
}


