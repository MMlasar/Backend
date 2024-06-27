import winston from "winston";

export const messages = [];

export function startSocket(socketServer, ManagerProduct) {
    socketServer.on("connection", (socket) => {
        socket.emit("products", ManagerProduct.readproducts());

        socket.on("new products", async (data) => {
            try {
                winston.info(data);
                ManagerProduct.createproducts(data);
                socket.emit("products", ManagerProduct.readproducts());
            } catch (error) {
                winston.error(error);
            }
        });

        socket.on("user", () => {
            socket.emit("all", messages);
        });

        socket.emit("message", messages);

        socket.on("new message", (data) => {
            messages.push(data);
            socketServer.emit("all", messages);
        });
    });
}
