import assert from 'assert';
import 'dotenv/config.js';
import dao from '../../src/data/index.factory.js';

const { user } = dao;

describe("Pruebas del Modelo de Usuarios", () => {
    const model = new user();

    it("La creación de un usuario debe devolver un objeto con la propiedad 'name'", async () => {
        const data = { name: 'Usuario de Prueba', email: 'prueba@example.com', password: '123456' };
        const one = await model.create(data);
        assert.ok(one.name);
    });

    it("El método 'getAll' debe devolver una lista de usuarios", async () => {
        const users = await model.getAll();
        assert.ok(Array.isArray(users));
    });

    it("La función creadora de un usuario debe devolver un objeto con la propiedad '_id'", async () => {
        const data = { name: 'Usuario de Prueba', email: 'prueba@example.com', password: '123456' };
        const one = await model.create(data);
        assert.ok(one._id);
    });

    it("La función creadora de un usuario debe devolver un objeto", async () => {
        const data = { name: 'Usuario de Prueba', email: 'prueba@example.com', password: '123456' };
        const one = await model.create(data);
        assert.strictEqual(typeof one, "object");
    });

    it("El usuario creado debe tener el nombre proporcionado", async () => {
        const data = { name: 'Usuario de Prueba', email: 'prueba@example.com', password: '123456' };
        const one = await model.create(data);
        assert.strictEqual(one.name, data.name);
    });

    it("El usuario creado debe tener el email proporcionado", async () => {
        const data = { name: 'Usuario de Prueba', email: 'prueba@example.com', password: '123456' };
        const one = await model.create(data);
        assert.strictEqual(one.email, data.email);
    });

    it("El usuario creado debe tener un rol predeterminado si no se proporciona", async () => {
        const data = { name: 'Usuario de Prueba', email: 'prueba@example.com', password: '123456' };
        const one = await model.create(data);
        assert.strictEqual(one.role, 'USER'); // Rol predeterminado
    });

    it("El usuario creado debe tener una edad predeterminada si no se proporciona", async () => {
        const data = { name: 'Usuario de Prueba', email: 'prueba@example.com', password: '123456' };
        const one = await model.create(data);
        assert.strictEqual(one.age, 18); // Edad predeterminada
    });

    it("El usuario creado no debe tener la propiedad 'last_name' si no se proporciona", async () => {
        const data = { name: 'Usuario de Prueba', email: 'prueba@example.com', password: '123456' };
        const one = await model.create(data);
        assert.strictEqual(one.last_name, undefined);
    });

    it("La eliminación de un usuario debe devolver un mensaje de éxito", async () => {
        const data = { name: 'Usuario a Eliminar', email: 'eliminar@example.com', password: '123456' };
        const one = await model.create(data);
        const userId = one._id;

        const deleteResult = await model.delete(userId);
        assert.ok(deleteResult.deletedCount === 1);
    });
});
