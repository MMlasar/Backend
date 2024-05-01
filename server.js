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
import { startSocket, messages } from './src/utils/socket.utils.js';
import ManagerProduct from './src/data/fs/products.fs.js';
import dbconnection from "./src/utils/db.connection.utils.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionFileStote from "session-file-store";
import MongoStore from "connect-mongo";
import args from "./src/utils/args.utils.js";
import cors from "cors"
import compression from "express-compression";
import winston from "./src/middlewares/wiston.js";
import winstonLog from "./src/utils/logger/winston.utils.js";
import cluster from "cluster";
import { cpus } from "os";


const app = express();
const PORT = env.PORT || 8080;

const ready = () => {
    winstonLog.INFO(`Server ready on port ${PORT}`);
    dbconnection()
};

const httpServer = createServer(app);
const socketServer = new Server(httpServer);

const __dirname = path.resolve();

//función importada para la lógica de sockets
startSocket(socketServer, ManagerProduct);

// Templates
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));

const FileStore = sessionFileStote(expressSession);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(winston);
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
}));
//app.use(expressSession({
  //  secret: "process.env SECRET_KEY",
    //reserve: true,
    //saveUnitialized: true,
    //store: new FileStore({
      //  path: "./src/data/fs/files/sessions",
        //ttl: 10,
        //retries: 2,
    //})
//}))

app.use(expressSession)({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        ttl: 7 *24 *60 *60,
        mongoUrl: process.env.DB_LINK
    })

})
app.use(compression({
  brotli: { enabled:true, zlib:{}}
}));

// Routers
const router = new IndexRouter();
app.use("/", router. getRouter());
app.use(errorHandler);
app.use(pathHandler);

//clusters
if (cluster.isPrimary) {
  const numbersOfProcess = cpus().length;
  winston.info("NUMBERS OF PROCESS OF MY COMPUTER: " + numbersOfProcess);
  for (let i = 1; i <= numbersOfProcess; i++) {
      cluster.fork();
  }
} else {
  httpServer.listen(PORT, ready);
}