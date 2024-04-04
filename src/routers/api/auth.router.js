import { Router } from "express";
import { register, login, signout, verifyAccount } from "../../controllers/auth.controler.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

const authrouter = Router();

authrouter.post("/register", passCallBack("register"), register);
authrouter.post("/login", passCallBack("login"), login);
authrouter.post("/singout", passCallBack("singout"), signout);
authrouter.post("/", verifyAccount);

export default authrouter;
