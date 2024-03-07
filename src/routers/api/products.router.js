import customRouter from "../customRouter.js"
import ManagerProduct from "../../data/fs/products.fs.js";
import propsProducts from "../../middlewares/propsProducts.js";
import isAdminMid from "../../middlewares/isAdmin.mid.js";
import passport from "../../middlewares/passport.mid.js";

export default class ProductsRouter extends customRouter {
    init() {
        this.create("/", ["ADMIN","PREM"],passport.authenticate("jwt", { session: false }), isAdminMid, propsProducts, async (req, res, next) => {
            try {
                const data = req.body;
                const response = await ManagerProduct.create(data);
                return res.success201(response);
            } catch (error) {
                return next(error);
            }
        });

        this.read('/', ["PUBLIC"] ,async (req, res, next) => {
            try {
                const products = await ManagerProduct.read()
                if (products) {
                    return res.success200(all)
                } else {
                    return res.success404(all)
                }
            } catch (error) {
                return next(error);
            }
        });

        this.read('/:pid',["PUBLIC"] ,async (req, res, next) => {
            try {
                const { pid } = req.params
                const product = await ManagerProduct.readOne(pid)
                if (product) {
                    return res.success200(one)
                } else {
                    return res.success404(one)
                }
            } catch (error) {
                return next(error);
            }
        });

        this.update('/:pid',["ADMIN","PREM"] ,async (req, res, next) => {
            try {
                const { pid } = req.params
                const data = req.body;
                const product = await ManagerProduct.update(pid, data)
                if (product) {
                    return res.success200(response)
                } else {
                    return res.success404(response)
                }
            } catch (error) {
                return next(error);
            }
        });

        this.destroy('/:pid', ["ADMIN","PREM"] ,async (req, res, next) => {
            try {
                const { pid } = req.params
                const product = await ManagerProduct.destroy(pid)
                if (product) {
                    return res.success200(response)
                } else {
                    return res.success404(response)
                }
            } catch (error) {
                return next(error);
            }
        });
    }
}
