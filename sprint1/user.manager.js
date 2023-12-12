class UserManager {
    static users = [];
    static #nextId = 1;

    constructor(data) {
        this.id = UserManager.#nextId++;
        this.name = data.name;
        this.email = data.email;
        UserManager.users.push(this);
    }

    createUser(data) {
        const user = {
            id: UserManager.#nextId++,
            name: data.name,
            email: data.email,
        };
        UserManager.users.push(user);
    }

    readUsers() {
        return UserManager.users;
    }

    readUserById(id) {
        return UserManager.users.find(user => user.id === parseInt(id));
    }
}

const userManager = new UserManager({
    name: "roron",
    email: "roron@elroron",
});

userManager.createUser({
    name: "mariano",
    email: "mariano@hotmail",
});

userManager.createUser({
    name: "kraken",
    email: "kraken@hotmail.com",
});

console.log(userManager.readUsers());
console.log(userManager.readUserById(1));
