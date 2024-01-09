import express from "express";
import router from "./challenger1/routers/index.router.js";
import errorhandler from "./challenger1/middlewares/errorhandler.mid.js";
import pathhandler from "./challenger1/middlewares/pathhandler.mid.js";

const server = express();
const PORT = 8080;

const ready = () => console.log("Server ready on port " + PORT);

server.listen(PORT, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);
server.use (errorhandler)
server.use(pathhandler)