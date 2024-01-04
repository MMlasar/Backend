class ProductosManager {
    static product = [];
    static #pergain = 0.3;
    static #totalgain = 0;

    constructor(data) {
        this.id =
            ProductosManager.product.length === 0
                ? 1
                : ProductosManager.product[ProductosManager.product.length - 1].id + 1;

        this.name = data.name;
        this.price = data.price || 3000;
        this.stock = data.stock || 60;
        this.date = data.date || new Date();
        ProductosManager.product.push(this);
    }

    create(data) {
        const product = {
            id:
                ProductosManager.product.length === 0
                    ? 1
                    : ProductosManager.product[ProductosManager.product.length - 1].id + 1,
            name: data.name,
            price: data.price || 3000,
            stock: data.stock || 60,
            date: data.date || new Date(),
        };
        ProductosManager.product.push(product);
    }

    read() {
        return ProductosManager.product;
    }

    readById(id) {
        return ProductosManager.product.find(each => each.id === parseInt(id));
    }

    destroy(id) {
        ProductosManager.product = ProductosManager.product.filter(each => each.id !== parseInt(id));
    }
}

const productManager = new ProductosManager({
    name: "producto1",
    price: "1000",
    stock: "30",
});

productManager.create({
    name: "producto2",
    price: "500",
    stock: "10",
});

productManager.create({
    name: "producto3",
    price: "10000",
    stock: "5",
});

console.log(productManager.read());
console.log(productManager.readById(1));

productManager.destroy(2);
console.log("Producto con ID 2 eliminado.");

const updatedProducts = productManager.read();
console.log("Productos actualizados:", updatedProducts);

