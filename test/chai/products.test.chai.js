import { expect } from 'chai';
import 'dotenv/config.js';
import dao from '../../src/data/index.factory.js';
import 'dotenv/config.js';

describe("Pruebas del Modelo de Productos con Chai", () => {
    const Product = new dao.products();
    const data = { name: "Balanza analítica" };
    let id;

    it("La creación de un producto requiere un objeto con la propiedad 'name'", () => {
        expect(data).to.have.property("name");
    });

    it("La función creadora de un producto debe devolver un objeto con la propiedad '_id'", async () => {
        const result = await Product.create(data);
        expect(result).to.have.property("_id");
    });

    it("La función creadora de un producto debe devolver un objeto", async () => {
        const result = await Product.create(data);
        expect(result).to.be.an('object');
    });

    it("El producto creado debe tener el nombre proporcionado", async () => {
        const result = await Product.create(data);
        expect(result.name).to.equal(data.name);
    });

    it("El producto creado debe tener un precio igual al proporcionado", async () => {
        const dataWithPrice = { ...data, price: 100 };
        const result = await Product.create(dataWithPrice);
        expect(result.price).to.equal(dataWithPrice.price);
    });

    it("El producto creado debe tener un stock predeterminado si no se proporciona", async () => {
        const result = await Product.create(data);
        expect(result.stock).to.equal(10); // Suponiendo un stock predeterminado de 10
    });

    it("El producto creado no debe tener la propiedad 'photo' si no se proporciona", async () => {
        const result = await Product.create(data);
        expect(result).to.not.have.property('photo');
    });

    it("El método 'getAll' debe devolver una lista de productos", async () => {
        const result = await Product.getAll();
        expect(result).to.be.an('array');
    });
});
