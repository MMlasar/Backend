import { ObjectId } from "bson";
import { model, Schema,Types } from "mongoose";

const collection = "orders";
const schema = new Schema({
    user_id: { type: Types.ObjectId, require: true, ref: "porducts" },
    product_id: { type: Types.ObjectId, require: true , ref: "porducts" },
    quantity: {type: Number, default:1},
    state: { type: String, default:"reserved", enum :["reserved","payed","delivered"]},


},{ timestamps: true });


schema.pre("find",function () { this.populate("user_id","-password") } )
schema.pre("find",function () { this.populate("product_id","-place price")} )

const Order = model(collection,schema)
export default Order;

