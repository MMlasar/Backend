import argsUtils from "../utils/args.utils.js";
import dbconnection from "../utils/db.connection.utils.js";
import winston from "winston";
import "dotenv/config.js";

const environment = argsUtils.env;

let dao = {};

switch (environment) {
    case "test":
        // Usamos la memoria
        winston.info("MEMORY CONNECTED");
        const { default: productsMemory } = await import("./memory/products.memory.js");
        dao = { products: productsMemory };
        break;
    case "dev":
        // Usamos FS
        winston.info("FS CONNECTED");
        const { default: productsFs } = await import("./fs/products.fs.js");
        dao = { products: productsFs };
        break;
    case "prod":
        // Usamos MONGO
        // es necesario configurar la conexion de mongo
        winston.info("MONGO CONNECTED");
        const { default: productsMongo } = await import("./mongo/products.mongo.js");
        dao = { products: productsMongo };
        break;
    default:
        break;
}

const persistence = process.env.PERSISTENCE || "MONGO";

switch (persistence) {
    case "MEMORY":
        break;
    case "FS":
        dbconnection();
        winston.info("FS CONNECTED");
        const { default: ProductsFs } = await import("./fs/products.fs.js");
        const { default: UsersFs } = await import("./fs/users.fs.js");
        dao.products = ProductsFs;
        dao.users = UsersFs;
        break;
    default:
        break;
}

export default dao;
