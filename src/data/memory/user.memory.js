import winston from "winston";
import crypto from "crypto";

class UserManager {
    static #user = [];

    constructor() {}

    create(data) {
        try {
            const newUser = {
                id: crypto.randomBytes(12).toString("hex"),
                name: data.name,
                photo: data.photo,
                email: data.email,
            };

            if (data.name && data.photo && data.email) {
                UserManager.#user.push(newUser);
                return newUser;
            } else {
                throw new Error("Los campos name, photo, email son obligatorias");
            }
        } catch (error) {
            winston.error(`Error al crear usuario: ${error.message}`);
            return error.message;
        }
    }

    read() {
        try {
            if (UserManager.#user.length === 0) {
                throw new Error("No se encontró ningún usuario");
            } else {
                return UserManager.#user;
            }
        } catch (error) {
            winston.error(`Error al leer usuarios: ${error.message}`);
            return error.message;
        }
    }

    readOne(id) {
        try {
            const user = UserManager.#user.find((user) => user.id === id);

            if (user) {
                return user;
            } else {
                throw new Error("Usuario no encontrado");
            }
        } catch (error) {
            winston.error(`Error al leer usuario: ${error.message}`);
            return error.message;
        }
    }

    update(id, data) {
        try {
            const one = this.readOne(id);

            if (!one) {
                throw new Error("Usuario no encontrado");
            } else {
                const index = UserManager.#user.indexOf(one);
                one.name = data.name || one.name;
                one.photo = data.photo || one.photo;
                one.email = data.email || one.email;

                UserManager.#user[index] = one;

                return "Usuario actualizado";
            }
        } catch (error) {
            winston.error(`Error al actualizar usuario: ${error.message}`);
            return error.message;
        }
    }

    destroy(id) {
        try {
            const user = UserManager.#user.find((user) => user.id === id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            } else {
                const index = UserManager.#user.indexOf(user);
                UserManager.#user.splice(index, 1);

                return "Usuario eliminado";
            }
        } catch (error) {
            winston.error(`Error al eliminar usuario: ${error.message}`);
            return error.message;
        }
    }
}

const Manager = new UserManager();
winston.info(Manager.create({ photo: "https://picsum.photos/200", email: "jH6Qm@example.com" }));
Manager.create({ name: "Roman", photo: "https://picsum.photos/200", email: "jH6Qm@example.com" });
winston.info(Manager.read());
