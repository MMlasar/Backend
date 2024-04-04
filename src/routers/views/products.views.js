import { Router } from "express";
//import products from "../../data/fs/products.fs.js";
import products from "../../data/mongo/products.mongo.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

const productsRouter = Router()

productsRouter.get("/", async(req, res , next )=>{
    try {
        const all = await products.readproducts()
        return res.render ("products", {products: all })
        
    } catch (error) {
        next(error)
        
    }
})
productsRouter.get("/new",async(req,res,next)=>{
    try {
        return res.render("new")
        
    } catch (error) {
        next(error)
        
    }
})

export default productsRouter