import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";

const schema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true, index: ture },
    password: { type: String, required: true },
    photo: { type: String, default: "https://picsum.photos/200" },
    age: { type: Number, default: 18 },
}, { timestamps: true });


schema.plugin(mongoosePaginate);

const User = model(collection, schema);
export default User;

