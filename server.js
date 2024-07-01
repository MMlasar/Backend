// server.js

import env from "./src/utils/env.utils.js";
import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import IndexRouter from './src/routers/index.router.js';
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import { engine } from "express-handlebars";
import morgan from "morgan";
import path from "path";
import { startSocket } from './src/utils/socket.utils.js'; // Asegúrate de importar startSocket si es necesario
import dbconnection from "./src/utils/db.connection.utils.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import compression from "express-compression";
import CustomRouter from "./src/routers/customRouter.js"; // Asegúrate de importar CustomRouter si es necesario
import { default as winston, logger } from "./src/middlewares/winston.js"; // Importa winston y logger correctamente
import winstonLog from "./src/utils/logger/winston.utils.js";
import cluster from "cluster";
import { cpus } from "os";
import options from "./src/utils/swagger.js";
import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

const app = express();
const PORT = env.PORT || 8080;

// Configuración de Swagger
const specs = swaggerJsdoc(options);
app.use("/api/docs", serve, setup(specs));

const ready = () => {
    winstonLog.info(`Server ready on port ${PORT}`);
    dbconnection();
};

const httpServer = createServer(app);
const socketServer = new Server(httpServer);

// Función importada para la lógica de sockets
startSocket(socketServer);

// Configuración de templates Handlebars
const __dirname = path.resolve();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));

// Configuración de la sesión con MongoDB usando connect-mongo
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_LINK,
        ttl: 7 * 24 * 60 * 60, // 7 días en segundos
    })
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(winston); // Asegúrate de usar `winston` como middleware
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(compression({
    brotli: { enabled: true, zlib: {} }
}));

// Routers
const router = new IndexRouter();
app.use("/", router.getRouter());

// Manejo de errores y rutas no encontradas
app.use(errorHandler);
app.use(pathHandler);

// Clusters
if (cluster.isPrimary) {
    const numberOfProcesses = cpus().length;
    logger.info("Number of processes in the system: " + numberOfProcesses); // Usa `logger.info` en lugar de `winston.info`
    for (let i = 1; i <= numberOfProcesses; i++) {
        cluster.fork();
    }
} else {
    httpServer.listen(PORT, ready);
}
