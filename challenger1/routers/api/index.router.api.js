import { Router} from "express";
import userrouter from "./user.router.js";
import productsrouters from "./products.router.js";


const apirouter = Router()

apirouter.use("/users",userrouter)
apirouter.use("/products",productsrouters)


export default apirouter