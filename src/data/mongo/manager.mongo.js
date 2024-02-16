import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import order from "./models/order.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";
import { Stats } from "fs";



class MongoManager {
    constructor (model) {
        this.model = model;
    }

    async create (data) {
        try {
            const one = await this.model.create(data);
            return one._id;
            
        } catch (error) {
            throw error;
        }
    }

    async read(obj) {
        try {
            const { filter, order } = obj;
            const all = await this.model.find(filter).sort(order);
    
            if (all.length === 0) {
                const error = new Error("there aren't products");
                error.statusCode = 404;
                throw error;
            }
            return all;
        } catch (error) {
            throw error;
        }
    }
    
    async readOne(id) {
        try {
            const one = await this.model.findById(id);
            notFoundOne(one)
         }    catch (error) {
            throw error;
        }
     
    }

    async update(id, data) {
        try {
            const opt = { new: true };
            const one = await this.model.findByIdAndUpdate(id, data, opt);
            if (!one) {
                const error = new Error("there isn't product");
                error.statusCode = 404;
                throw error;
            }
            return one;
        } catch (error) {
            throw error;
        }
    }

    async destroy(id) {
        try {
            const one = await this.model.findByIdAndDelete(id);
            notFoundOne(one)
        }    catch (error) {
           throw error;
       }
    }
    
    async stats( {filter} ){
        try {
            let = stats =await this.model(filter).explain("executionStats");

            stats= {
                quantity: this.stats.executionStats.nReturned,
                time: this.stats.executionStats.executionTimeMillis,
            };
            return stats;

        } catch (error) {
            throw error
        }
    }
}

const users = new MongoManager(User)
const products = new MongoManager(Product)
const orders = new MongoManager(order)

export { users , products, orders };
export default MongoManager;
