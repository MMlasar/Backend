// server.js
import "dotenv/config.js";

import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import router from './src/routers/index.router.js';
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import { engine } from "express-handlebars";
import morgan from "morgan";
import path from "path";
import { startSocket, messages } from './src/utils/socket.utils.js';
import ManagerProduct from './src/data/fs/products.fs.js';
import dbconnection from "./src/utils/db.connection.utils.js";
import cookieParser from "cookie-parser";
import session from "express-session";



const app = express();
const PORT = 8080;

const ready = () => {
    console.log(`Server ready on port ${PORT}`);
    dbconnection()
};

const httpServer = createServer(app);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);

const __dirname = path.resolve();

//función importada para la lógica de sockets
startSocket(socketServer, ManagerProduct);

// Templates
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(cookieParser())
app.use(expressSession({
    secret: "process.env SECRET_KEY",
    reserve: true,
    saveUnitialized: true,
    cookie: { maxAge: 60000},
}))

// Routers
app.use("/", router);
app.use(errorHandler);
app.use(pathHandler);

