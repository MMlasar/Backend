// products.mongo.js

// Importamos la clase MongoManager desde manager.mongo.js
import MongoManager from "./manager.mongo.js";

// Importamos el modelo de producto desde product.model.js
import Product from "./models/product.model.js";

// Creamos una instancia de MongoManager usando el modelo de Producto
const products = new MongoManager(Product);

// Exportamos la instancia de products como el valor predeterminado
export default products;
