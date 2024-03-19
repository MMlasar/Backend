import customRouter from "../customRouter.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import { create, read , readOne , update, destroy } from "../../controllers/products.controllers.js";


export default class ProductsRouter extends customRouter {
    init() {
        this.create("/", ["ADMIN","PREM"], passCallBackMid("jwt"), create);
        this.read('/', ["PUBLIC"], read );
        this.read('/:pid',["PUBLIC"], readOne);
        this.update('/:pid',["ADMIN","PREM"], update);
        this.destroy('/:pid', ["ADMIN","PREM"], destroy);
    }
}
