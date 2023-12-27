import { promises as fs } from "fs";
import path from "path";

class UserManager {
    constructor() {
        this.path = path.join(__dirname, "sprint_2/data/usermanager.json");
        this.users = [];
    }

    static id = 0;

    addUser = async (name, email) => {
        UserManager.id++;
        let newUser = {
            name,
            email,
            id: UserManager.id
        };

        this.users.push(newUser);

        await this.writeUsersToFile();
    };

    readUsers = async () => {
        try {
            let response = await fs.readFile(this.path, "utf-8");
            return JSON.parse(response);
        } catch (error) {
            return [];
        }
    };

    getUsers = async () => {
        let response = await this.readUsers();
        return response;
    };

    getUserById = async (id) => {
        let users = await this.getUsers();
        return users.find((user) => user.id === id);
    };

    destroy = async (id) => {
        this.users = this.users.filter((user) => user.id !== id);
        await this.writeUsersToFile();
    };

    writeUsersToFile = async () => {
        await fs.writeFile(this.path, JSON.stringify(this.users, null, 2));
    };
}

(async () => {
    const userManager = new UserManager();

    await userManager.addUser("marian", "marian@hotmail.com");

    const allUsers = await userManager.getUsers();
    console.log("Todos los usuarios:", allUsers);

    const userById = await userManager.getUserById(1);
    console.log("Usuario con ID 1:", userById);

    await userManager.destroy(1);
    console.log("Usuario con ID 1 eliminado.");

    const updatedUsers = await userManager.getUsers();
    console.log("Usuarios actualizados:", updatedUsers);
})();

export default UserManager;
