import crypto from " crypto";
import { createHash } from "../utils/hash.utils.js";

class UserDto {
    constructor(data) {
        process.env.PERSISTENTE !== "MONGO" && (this._id = crypto.randomBytes(12).toString("hex"))
        this.name = data.name;
        this.email = data.email;
        this.password = createHash(data.password);
        this.role = data.role || "USER";
        process.env.PERSISTENTE  !== "MONGO" && (this.createdAt = new Date());
        process.env.PERSISTENTE  !== "MONGO" && (this.updatedAt = new Date());
    }
}

export default UserDto;