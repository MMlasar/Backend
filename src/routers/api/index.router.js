import CustomRouter from "../customRouter.js";
import usersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./session.router.api.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import { products } from "../../data/mongo/manager.mongo.js";
import commentsRouter from "./comments.router.js";

const product = new ProductsRouter()

 export default class apiRouter extends CustomRouter {
    init() {
        this.use("/users", usersRouter);
        this.use("/products", product.getRouter());
        this.use("/orders", passCallBackMid("jwt"), ordersRouter);
        this.use("/sessions", sessionsRouter);
        this.use("/comments", commentsRouter);
    }
}


