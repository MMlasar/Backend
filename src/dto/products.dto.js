import argsUtils from "../utils/args.utils.js";
import crypto from "crypto";

class ProductsDTO {
    constructor(data) {
        argsUtils.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"));
        this.title = data.title;
        this.photo = data.photo;
        this.price = data.price || 5;
        this.stock = data.stock || 50;
        this.date = data.date || new Date();
        argsUtils.env !== "prod" && (this.updatedAt = new Date());
        argsUtils.env !== "prod" && (this.createdAt = new Date());
    }
}

export default ProductsDTO