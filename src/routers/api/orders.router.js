import { Router } from "express";
import propsOrder from "../../middlewares/propsOrders.js";
// import ManagerOrders from "../../data/fs/orders.fs.js"; // Comentar para usar MongoDB
import { order } from "../../data/mongo/models/order.model.js"; // Importar el modelo de pedidos de MongoDB
import { orders } from "../../data/mongo/manager.mongo.js";

const ordersRouter = Router();

ordersRouter.post("/", propsOrder, async (req, res, next) => {
    try {
        const data = req.body;
        const response = await order.create(data); // Utilizar el modelo de pedidos de MongoDB
        return res.json({
            statusCode: 201,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

ordersRouter.get('/', async (req, res, next) => {
    try {
        // Para usar el administrador de pedidos del sistema de archivos
        // allOrders = await ManagerOrders.read();

        // Para usar el modelo de pedidos de MongoDB
        const allOrders = await order.find(); // Utilizar el modelo de pedidos de MongoDB
        if (allOrders) {
            return res.status(200).json({
                statusCode: 200,
                response: allOrders,
            });
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: "Not found!",
            });
        }
    } catch (error) {
        return next(error);
    }
});


ordersRouter.get("/bills/:uid", async(req,res,next)=>{
    try {
        const { uid } = req.params
        const report = await orders.reportBill(uid)
        return res.json({
            statusCode: 200,
            response: report
        })
    } catch (error) {
        return next(error)
    }
})



ordersRouter.get('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const orderDetails = await order.findById(uid); // Utilizar el modelo de pedidos de MongoDB
        if (orderDetails) {
            return res.status(200).json({
                statusCode: 200,
                response: orderDetails,
            });
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: "Not found!",
            });
        }
    } catch (error) {
        return next(error);
    }
});

ordersRouter.delete('/:oid', async (req, res, next) => {
    try {
        const { oid } = req.params;
        const deletedOrder = await order.findByIdAndDelete(oid); // Utilizar el modelo de pedidos de MongoDB
        if (deletedOrder) {
            return res.status(200).json({
                statusCode: 200,
                response: deletedOrder,
            });
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: "Not found!",
            });
        }
    } catch (error) {
        return next(error);
    }
});

ordersRouter.put('/:oid/:quantity/:state', async (req, res, next) => {
    try {
        const { oid, quantity, state } = req.params;
        const updatedOrder = await order.findByIdAndUpdate(oid, { quantity, state }, { new: true }); // Utilizar el modelo de pedidos de MongoDB
        if (updatedOrder) {
            return res.status(200).json({
                statusCode: 200,
                response: updatedOrder,
            });
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: "Not found!",
            });
        }
    } catch (error) {
        return next(error);
    }
});

export default ordersRouter;
