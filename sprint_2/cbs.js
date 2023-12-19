const fs = require("fs").promises;
const path = require("path");

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, "sprint_2/data/productomanager.json");
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, stock) => {
        ProductManager.id++;
        let newProduct = {
            title,
            description,
            price,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct);

        await this.writeProductsToFile();
    };

    readProduct = async () => {
        try {
            let response = await fs.readFile(this.path, "utf-8");
            return JSON.parse(response);
        } catch (error) {
            return [];
        }
    };

    getProducts = async () => {
        let response = await this.readProduct();
        return response;
    };

    getProductByID = async (id) => {
        let products = await this.getProducts();
        return products.find((product) => product.id === id);
    };

    writeProductsToFile = async () => {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    };
}


(async () => {
    const productManager = new ProductManager();

    
    await productManager.addProduct("pc", "Pc gamer", 1200, 10);

    
    const allProducts = await productManager.getProducts();
    console.log("Todos los productos:", allProducts);

    
    const productById = await productManager.getProductByID(1);
    console.log("Producto con ID 1:", productById);
})();

