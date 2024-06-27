import CustomRouter from "../customRouter.js";
// import products from "../../data/mongo/products.mongo.js";
import productsRouter from "./products.views.js";
import userRouter from "./user.view.js";

export default class viewsRouter extends CustomRouter {
    init() {
        this.use("/users", userRouter);
        this.use("/products", productsRouter);

        this.read("/", ["PUBLIC"], (req, res, next) => {
            try {
                const mainProducts = ["tablet samsung ", "laptop", "tv"];
                const date = new Date();
                return res.render("index", { products: mainProducts, date: date });
            } catch (error) {
                next(error);
            }
        });
    }
}


