// db.connection.utils.js
import { connect } from "mongoose";
import winston from "./logger/winston.utils.js";

const dbConnection = async () => {
    try {
        await connect(process.env.DB_LINK);
        winston.info("Database connected");
    } catch (error) {
        winston.error(error.message);
        throw new Error("Unable to connect to the database");
    }
};

export default dbConnection;
