import CustomRouter from "../customRouter.js";
import usersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./session.router.api.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import { products } from "../../data/mongo/manager.mongo.js";

const product = new ProductsRouter()

 export default class apiRouter extends CustomRouter {
    init() {
        this.Router.use("/users", usersRouter);
        this.Router.use("/products", product.getRouter());
        this.Router.use("/orders", passCallBackMid("jwt"), ordersRouter);
        this.Router.use("/sessions", sessionsRouter);
    }
}


