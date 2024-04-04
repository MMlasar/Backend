import CustomRouter from "../customRouter";
import products from "../../data/mongo/products.mongo.js";

import productsRouter from "./products.views";
import userRouter from "./user.view";

    
export default class viewsRouter extends CustomRouter {
    init(){
        this.router.use("/users", userRouter);
        this.router.use("/products",productsRouter);
        this.read("/",["PUBLIC"],(req,res,next)=>{
            try {
                const mainProducts = ["tablet samsung ","laptop","tv"]
                const date = new Date ();
                return res.render("index",{products: mainProducts, date: date });
            } catch (error) {
                next(error)
                
            }
        });
        
    }
}



