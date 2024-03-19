import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import order from "./models/order.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";
import { Stats } from "fs";
import { Types } from "mongoose";
import { types } from "util";



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

    async read( { filter , orderAndPaginate} ) {
        try {
            const all = await this.model
            //const all = await this.model.find(filter).sort(order);

            .paginate(filter, orderAndPaginate);
            //console.log(all.docs);
    
            //if (all.docs.length === 0) {
                if (all.totalPages === 0){
                const error = new Error("there aren't products");
                error.statusCode = 404;
                throw error;
            }
            return all;
        } catch (error) {
            throw error;
        }
    }

    async reportBill (uid) {
        try {
            const report = await this.model.aggregate([
                {$match: { user_id: new types.ObjetId(uid)}},
                {$lookup: { 
                    from:"products",
                    foreignField: "_id",
                    localField:"product_id",
                    as:"product_id",
                }},
                {$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElementAt: ["$product_id", 0]}, "$$ROOT" ] } } },
                {$set : { subtotal: {$multiply:["$price","$quantity"]}}},
                {$group: { _id:"$product_id", total: { $sum: "$subtotal"}} },
                {$project: {_id:0, product_id:"$_id", total: "$total", date: new Date() } },
                //{$marge: { into: "bills"}},
            ]);
            return report
        } catch (error) {
            throw error
        }
    }
    
    async readOne(id) {
        try {
            const one = await this.model.findById(id).lean();
            notFoundOne(one);
            return one;
         }    catch (error) {
            throw error;
        }
    }

    async readByEmail(email){
        try {
            const one = await this.model.findOne({ email })
           //notFoundOne(one);
            return one;
        } catch (error) {
            throw error
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
const comments = new MongoManager (comments)

export { users , products, orders, comments };
export default MongoManager;
