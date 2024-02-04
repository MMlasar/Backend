import { Router } from "express";
import productsRouter from "./products.views";
import userRouter from "./user.view";

const viewsRouter = Router();

viewsRouter.get("/",(req,res,next)=>{
    try {
        const mainProducts = ["tablet samsung ","laptop","tv"]
        const date = new Date ();
        return res.render("index",{products: mainProducts, date: date });
    } catch (error) {
        next(error)
        
    }
});

viewsRouter.use("/users", userRouter);
viewsRouter.use("/products",productsRouter);
export default viewsRouter;
