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

    it(
        "la funcion creadora de un producto, devuelve un objeto con la propuedad '_id' ",
        async()=>{
            const one = await model.create(data);
            assert.ok(one._id);
        });
    
        it(
            "la funcion creadora de un producto, devuelve un objeto ",
            async()=>{
                const one = await model.create(data);
                assert.strictEqual(typeof one, "object");
            }
        )
});
