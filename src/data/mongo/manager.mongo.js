import winston from "winston";
import { Types } from "mongoose";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class MongoManager {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const one = await this.model.create(data);
            return one._id;
        } catch (error) {
            throw error;
        }
    }

    async read({ filter, orderAndPaginate }) {
        try {
            const all = await this.model.paginate(filter, orderAndPaginate);
            winston.info("Retrieved documents:", all);

            if (all.totalPages === 0) {
                const error = new Error("There are no products");
                error.statusCode = 404;
                throw error;
            }
            return all;
        } catch (error) {
            throw error;
        }
    }

    async reportBill(uid) {
        try {
            const report = await this.model.aggregate([
                {
                    $match: { user_id: new Types.ObjectId(uid) }
                },
                {
                    $lookup: {
                        from: "products",
                        foreignField: "_id",
                        localField: "product_id",
                        as: "product"
                    }
                },
                {
                    $set: { subtotal: { $multiply: ["$price", "$quantity"] } }
                },
                {
                    $group: {
                        _id: "$product_id",
                        total: { $sum: "$subtotal" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        product_id: "$_id",
                        total: "$total",
                        date: new Date()
                    }
                }
            ]);
            return report;
        } catch (error) {
            throw error;
        }
    }

    async readOne(id) {
        try {
            const one = await this.model.findById(id).lean();
            notFoundOne(one);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async readByEmail(email) {
        try {
            const one = await this.model.findOne({ email });
            return one;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const opt = { new: true };
            const one = await this.model.findByIdAndUpdate(id, data, opt);
            if (!one) {
                const error = new Error("Product not found");
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
            notFoundOne(one);
        } catch (error) {
            throw error;
        }
    }

    async stats({ filter }) {
        try {
            let stats = await this.model(filter).explain("executionStats");

            stats = {
                quantity: stats.executionStats.nReturned,
                time: stats.executionStats.executionTimeMillis
            };
            return stats;
        } catch (error) {
            throw error;
        }
    }
}

export default MongoManager;
