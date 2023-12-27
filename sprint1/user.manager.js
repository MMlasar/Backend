class UserManager {
    static users = [];
    static nextId = 1;

    constructor(data) {
        this.id = UserManager.nextId++;
        this.name = data.name;
        this.email = data.email;
        UserManager.users.push(this);
    }

    createUser(data) {
        const user = new UserManager(data);
        UserManager.users.push(user);
        return user;
    }

    readUsers() {
        return UserManager.users;
    }

    readUserById(id) {
        return UserManager.users.find(user => user.id === parseInt(id));
    }

    destroy(id) {
        UserManager.users = UserManager.users.filter(user => user.id !== parseInt(id));
    }
}

const userManager = new UserManager({
    name: "roron",
    email: "roron@elroron",
});

const user1 = userManager.createUser({
    name: "mariano",
    email: "mariano@hotmail",
});

const user2 = userManager.createUser({
    name: "kraken",
    email: "kraken@hotmail.com",
});

console.log("Usuarios antes de la eliminación:", userManager.readUsers());
console.log("Usuario con ID 1:", userManager.readUserById(1));


userManager.destroy(1);
console.log("Usuario con ID 1 eliminado.");

console.log("Usuarios después de la eliminación:", userManager.readUsers());
