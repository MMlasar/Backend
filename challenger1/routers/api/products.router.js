import { Router } from "express";
import ProductManager from "../sprint_2/cbs";

const productRouter = Router();
const productManager = new ProductManager();

productRouter.get("/", async (req, res, next) => {
    try {
        const allProducts = await productManager.getProducts();
        if (Array.isArray(allProducts)) {
            return res.status(200).json(allProducts);
        } else {
            return res.status(404).json({
                success: false,
                message: allProducts,
            });
        }
    } catch (error) {
        return next(error);
    }
});

productRouter.get("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductByID(parseInt(pid, 10));
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
    } catch (error) {
        return next(error);
    }
});

productRouter.post("/", async (req, res, next) => {
    try {
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
        });
    } catch (error) {
        return next(error);
    }
});

productRouter.put("/:pid", async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
        });
    } catch (error) {
        return next(error);
    }
});

productRouter.delete("/:pid", async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        return next(error);
    }
});

export default productRouter;
