import assert from 'assert';
import 'dotenv/config.js';
import dao from '../../src/data/index.factory.js';

const { product } = dao;

describe("Pruebas del Modelo de Productos", () => {
    const model = new product();

    it("La creación de un producto debe devolver un objeto con la propiedad 'name'", () => {
        const data = model.create({ name: 'Producto de Prueba', price: 10 });
        assert.ok(data.name);
    });

    it("El método 'getAll' debe devolver una lista de productos", () => {
        const products = model.getAll();
        assert.ok(Array.isArray(products));
    });

    it("La función creadora de un producto debe devolver un objeto con la propiedad '_id'", async () => {
        const data = { name: 'Producto de Prueba', price: 10 };
        const one = await model.create(data);
        assert.ok(one._id);
    });
    
    it("La función creadora de un producto debe devolver un objeto", async () => {
        const data = { name: 'Producto de Prueba', price: 10 };
        const one = await model.create(data);
        assert.strictEqual(typeof one, "object");
    });

    it("El producto creado debe tener el nombre proporcionado", async () => {
        const data = { name: 'Producto de Prueba', price: 10 };
        const one = await model.create(data);
        assert.strictEqual(one.name, data.name);
    });

    it("El producto creado debe tener un precio igual al proporcionado", async () => {
        const data = { name: 'Producto de Prueba', price: 10 };
        const one = await model.create(data);
        assert.strictEqual(one.price, data.price);
    });

    it("El producto creado debe tener un stock predeterminado si no se proporciona", async () => {
        const data = { name: 'Producto de Prueba', price: 10 };
        const one = await model.create(data);
        assert.strictEqual(one.stock, 10); // Stock predeterminado
    });

    it("El producto creado no debe tener la propiedad 'photo' si no se proporciona", async () => {
        const data = { name: 'Producto de Prueba', price: 10 };
        const one = await model.create(data);
        assert.strictEqual(one.photo, undefined);
    });
});
