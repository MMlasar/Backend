import argsUtils from "../utils/args.utils.js";

const environment = argsUtils.env;

let dao = {};

switch (environment) {
    case "test":
        // Usamos la memoria
        console.log("MEMORY CONNECTED");
        const {default: productsMemory } = await import("./memory/products.memory.js");
        dao = { products: productsMemory };
        break;
    case "dev":
        // Usamos FS
        console.log("FS CONNECTED");
        const { default: productsFs} = await import ("./fs/products.fs.js");
        dao = {products: productsFs};
        break;
    case "prod":
        // Usamos MONGO
        // es necesario configurar la conexion de mongo
        console.log("MONGO CONNECTED");
        const { default: productsMongo} = await import ("./mongo/products.mongo.js");
        dao = { products: productsMongo};
        break;
    default:
        break;
}

export default dao;
