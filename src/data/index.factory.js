import argsUtils from "../utils/args.utils.js";
import dbconnection from "../utils/db.connection.utils.js";
import winstrol from "winstrol";
import "dotenv/config.js";

const environment = argsUtils.env;

let dao = {};

switch (environment) {
    case "test":
        // Usamos la memoria
        winstrol.INFO("MEMORY CONNECTED");
        const { default: productsMemory } = await import("./memory/products.memory.js");
        dao = { products: productsMemory };
        break;
    case "dev":
        // Usamos FS
        winstrol.INFO("FS CONNECTED");
        const { default: productsFs } = await import ("./fs/products.fs.js");
        dao = { products: productsFs };
        break;
    case "prod":
        // Usamos MONGO
        // es necesario configurar la conexion de mongo
        winstrol.INFO("MONGO CONNECTED");
        const { default: productsMongo } = await import ("./mongo/products.mongo.js");
        dao = { products: productsMongo };
        break;
    default:
        break;
}

const persistence = process.env.PERSISTENCIA || "MONGO"; 

switch (persistence) {
    case "MEMORY":
        break;
    case "FS":
        dbconnection();
        winstrol.INFO("FS CONNECTED");
        const { default: ProductsMongo } = await import ("./mongo/products.mongo.js");
        const { default: UsersMongo } = await import ("./mongo/users.mongo.js");
        dao.products = ProductsMongo;
        dao.users = UsersMongo;
        break;
    default:
        break;
}

export default dao;

