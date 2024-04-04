//import products from "../data/mongo/products.mongo.js";

import repository from "../repositories/productos.rep.js";

class ProductsService {
    constructor() {
        this.repository = repository;
    }

    create = async (data) => {
        try {
            const response = await this.repository.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    };

    read = async ({filter, options }) =>
    {
        try {
            const response = await this.repository.read({filter, options});
            return response;
        } catch (error) {
            throw error;
        }
    };

    readOne = async (id) =>
    {
        try {
            const response = await this.repository.readOne(id);
            return response;
        } catch (error) {
            throw error;
        }
    };

    update = async (id,data) =>
    {
        try {
            const response = await this.repository.update(id, data);
            return response;
        } catch (error) {
            throw error;
        }
    };
    
    destroy = async (id) =>
    {
        try {
            const response = await this.repository.destroy(id);
            return response;
        } catch (error) {
            throw error;
        }
    };
}

const Service = new ProductsService();
export default Service;
