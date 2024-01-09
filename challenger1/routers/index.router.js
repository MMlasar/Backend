import { Router } from "express";
import apirouter from "./api/index.router";

const router = Router(); 

router.use("/api", apirouter);

export default router;


