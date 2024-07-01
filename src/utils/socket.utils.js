import winston from "winston";
import { products } from "../data/mongo/manager.mongo.js"; // Ajusta la ruta según sea necesario

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        // Puedes agregar más transportes según tus necesidades
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    )
});

// Definición de mensajes como array vacío
export const messages = [];

// Función para iniciar el socket
export function startSocket(socketServer) {
    socketServer.on("connection", (socket) => {
        // Emitir los productos al conectarse un nuevo socket
        socket.emit("products", products.read({ filter: {}, orderAndPaginate: {} }));

        // Manejar evento de nuevos productos
        socket.on("new products", async (data) => {
            try {
                logger.info("New products data:", data);
                await products.create(data);
                socket.emit("products", await products.read({ filter: {}, orderAndPaginate: {} }));
            } catch (error) {
                logger.error("Error creating product:", error);
            }
        });

        // Emitir todos los mensajes al evento 'user'
        socket.on("user", () => {
            socket.emit("all", messages);
        });

        // Emitir mensajes al evento 'message'
        socket.emit("message", messages);

        // Manejar nuevo mensaje recibido
        socket.on("new message", (data) => {
            messages.push(data);
            socketServer.emit("all", messages);
        });
    });
}

// Exportar el logger directamente
export { logger };
