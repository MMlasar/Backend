import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import router from './src/routers/index.router.js';
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import { engine } from "express-handlebars";
import morgan from "morgan";
import __dirname from "./utils.js";
import ManagerProduct from './src/data/fs/products.fs.js';

const app = express();
const PORT = 8080;

const ready = () => {
    console.log(`Server ready on port ${PORT}`);
};

const httpServer = createServer(app);
const socketServer = new Server(httpServer);

httpServer.listen(PORT, ready);

socketServer.on("connection", (socket) => {
    //console.log(socket);
    //socket es toda la data que envia el cliente luego del handshk
    console.log(socket.id);
    socket.emit("products", ManagerProduct.readproducts())
    socket.on("new products",async(data)=>{
        try {
            console.log(data);

            ManagerProduct.createproducts (data);

            socket.emit("products", ManagerProduct.readproducts())
            
        } catch (error) {
            console.log(error)
        }
     
    })
});

// Templates
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

// Routers
app.use("/", router);
app.use(errorHandler);
app.use(pathHandler);

