import { connect } from "mongoose";
import winston from "./logger/winston.utils.js";

const dbconnection = async () => {
    try {
        await connect(process.env.DB_LINK);
        winston.INFO("Database connected");
    } catch (error) {
        winston.ERROR(error.message);
    }
};

export default dbconnection;
