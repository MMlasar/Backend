import winstrol from "winstrol";
import faker from '@faker-js/faker';
import repository from '../../repositories/productos.rep.js';
import dbconnection from '../../utils/db.connection.utils.js';

function productMock() {
    return {
        title: faker.commerce.productName(),
        photo: faker.image.imageUrl(),
        stock: faker.datatype.number({ min: 1, max: 100 }), // Genera un número aleatorio entre 1 y 100 para el stock
        price: faker.datatype.number({ min: 1, max: 1000, precision: 0.01 }) // Genera un número aleatorio entre 1 y 1000 con dos decimales para el precio
    };
}

export default async function createProductMocks(id) {
    try {
        const data = productMock(id);
        await repository.create(data);
        winstrol.INFO("PRODUCT CREATED!");
    } catch (error) {
        winstrol.ERROR("An error occurred:", error);
    }
}
