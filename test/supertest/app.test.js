import 'dotenv/config.js';
import { expect } from 'chai';
import supertest from 'supertest';
import dao from '../../src/data/index.factory.js';

const { product, user } = dao;
const requester = supertest("http://localhost:" + process.env.PORT + "/api");

describe("Testeando BALANZASML API", () => {
    
    describe("Testeando PRODUCTS", () => {
        
        it("La creación de un producto debe devolver un objeto con la propiedad 'name'", async () => {
            const data = { name: 'Producto de Prueba', price: 10 };
            const response = await requester.post('/products').send(data);
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('name');
            expect(response.body.name).to.equal(data.name);
        });

        it("El método 'getAll' debe devolver una lista de productos", async () => {
            const response = await requester.get('/products');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });

        it("El producto creado debe tener un precio igual al proporcionado", async () => {
            const data = { name: 'Producto de Prueba', price: 10 };
            const response = await requester.post('/products').send(data);
            expect(response.status).to.equal(201);
            expect(response.body.price).to.equal(data.price);
        });

        it("La eliminación de un producto debe devolver un mensaje de éxito", async () => {
            const data = { name: 'Producto a Eliminar', price: 15 };
            const createResponse = await requester.post('/products').send(data);
            const productId = createResponse.body._id;

            const deleteResponse = await requester.delete(`/products/${productId}`);
            expect(deleteResponse.status).to.equal(200);
            expect(deleteResponse.body).to.have.property('message').that.equals('Product deleted successfully');
        });
    });

    describe("Testeando USERS", () => {
        const userData = {
            name: 'UsuarioDePrueba',
            last_name: 'ApellidoDePrueba',
            email: 'usuarioprueba@example.com',
            password: '123456',
            role: 'USER',
            photo: 'https://picsum.photos/200',
            age: 30
        };

        it("La creación de un usuario debe devolver un objeto con la propiedad 'name'", async () => {
            const response = await requester.post('/users').send(userData);
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('name');
            expect(response.body.name).to.equal(userData.name);
        });

        it("El método 'getAll' debe devolver una lista de usuarios", async () => {
            const response = await requester.get('/users');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });

        it("La autenticación de un usuario debe devolver un token", async () => {
            await requester.post('/users').send(userData); // Crear usuario
            const response = await requester.post('/sessions/auth').send({ email: userData.email, password: userData.password }); // Autenticar usuario
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token');
        });

        it("El inicio de sesión de un usuario debe ser exitoso con las credenciales correctas", async () => {
            const loginResponse = await requester.post('/sessions/login').send({ email: userData.email, password: userData.password }); // Iniciar sesión
            expect(loginResponse.status).to.equal(200);
            expect(loginResponse.body).to.have.property('token');
        });

        it("La eliminación de un usuario debe devolver un mensaje de éxito", async () => {
            const createResponse = await requester.post('/users').send(userData);
            const userId = createResponse.body._id;

            const deleteResponse = await requester.delete(`/users/${userId}`);
            expect(deleteResponse.status).to.equal(200);
            expect(deleteResponse.body).to.have.property('message').that.equals('User deleted successfully');
        });
    });
});
