import express from "express";
import ProductManager from "../sprint_2/cbs";

const server = express();

const PORT = 8080;
const ready = () => console.log("Server ready on port " + PORT);

const productManager = new ProductManager();

server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

server.get("/api/products", async (req, res) => {
    try {
        const all = await productManager.getProducts();
        if (Array.isArray(all)) {
            return res.status(200).json(all);
        } else {
            return res.status(404).json({
                success: false,
                message: all,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

server.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductByID(parseInt(pid));
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

