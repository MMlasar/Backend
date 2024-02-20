import { model, Schema } from "mongoose";

const collection = "products";
const productSchema = new Schema({
    title: { type: String, required: true, index: true },
    photo: { type: String, required: true },
    stock: { type: Number, default:10},
    price: {type: Number, default:50},
}, {
    timestamps: true
});

const Product = model(collection, productSchema);

export default Product;
