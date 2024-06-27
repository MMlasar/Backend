import { fork } from "child_process";
import CustomRouter from "../customRouter.js";
import ProductsRouter from "./products.router.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
// import commentsRouter from "./comments.router.js";

const product = new ProductsRouter();

export default class apiRouter extends CustomRouter {
    init() {
        this.use("/products", product.getRouter());

        this.read("/sum", ["PUBLIC"], async (req, res, next) => {
            try {
                const child = fork("./src/utils/sum.util.js");
                child.send("start");
                child.on("message", (result) => res.success200(result));
            } catch (error) {
                return next(error);
            }
        });
    }
}



