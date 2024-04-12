import faker from '@faker-js/faker';
import repository from '../../repositories/users.rep.js';
import createProductMocks from './products.mock.js';



function userMock () {
    return {
        name: faker.person.firstName(), 
        email:
         faker.person.firstName() +
         faker.person.lastName().toLowerCase() + 
         faker.datatype.hex(64) +
         "@balanzas.com",
        password:"hola1234"
    };
}

async function createMocks() {
    try {
        const data = userMock(); 
        dbconnection();
        await repository.create(data);
        await createProductMocks(user._id);
        console.log("USER CREATED!")
    } catch (error) {
        console.log(error);
    }
}
createMocks();