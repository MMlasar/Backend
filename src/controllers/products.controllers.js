import Service from "../services/products.services.js"

class ProductsControllers {
    constructor() {
        this.service = Service;
    }

    create = async (req, res, next) => {
        try {
            const data = req.body;
            const response = await this.service.create(data);
            return res.success201(response);
        } catch (error) {
            return next(error);
        }
    };

    read = async (req , res, next) =>{
        try {
            const options = {
                limit: req.query.limit || 20,
                page: req.query.page || 1,
                sort:{title:1},
                lean: true,
            };
            const filter ={};
                if (req.query.title) {
                    filter.title = new RegExp(req.query.title.trim(),"i");
                }
                if(req.query.sort === "desc") {
                    options.sort.title = "desc";
                }
                const all = await this.service.read({filter, options});
                return res.success200(all);
        } catch (error) {
            return next(error);
        }
    };

    readOne = async (req, res, next) => {
        try {
            const { pid } = req.params
            const product = await this.service.readOne(pid);
            if (product) {
                return res.success200(one)
            } else {
                return res.success404(one)
            }
        } catch (error) {
            return next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { pid } = req.params
            const data = req.body;
            const product = await this.service.update(pid, data)
            if (product) {
                return res.success200(response)
            } else {
                return res.success404(response)
            }
        } catch (error) {
            return next(error);
        }
    };

    destroy = async (req, res, next) => {
        try {
            const { pid } = req.params
            const product = await this.service.destroy(pid)
            if (product) {
                return res.success200(response)
            } else {
                return res.success404(response)
            }
        } catch (error) {
            return next(error);
        }
    }
}



export default ProductsControllers;
const controller = new ProductsControllers();
const {create, read, readOne ,update, destroy} = controller;
export { create, read , readOne , update, destroy };

