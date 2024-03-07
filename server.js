// server.js
import "dotenv/config.js";

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

const FileStore = sessionFileStote(expressSession);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(cookieParser())
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


// Routers
const router = new IndexRouter();
app.use("/", router. getRouter());
app.use(errorHandler);
app.use(pathHandler);

