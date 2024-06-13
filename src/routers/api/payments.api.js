import  { Router } from "express";
import checkoutController from "../../controllers/payments.controllers";

const paymentsRouter = Router();

paymentsRouter.post("/checkout", checkoutController );


export default paymentsRouter;