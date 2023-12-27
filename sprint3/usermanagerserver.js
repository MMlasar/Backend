import express from "express";
import UserManager from "../sprint_2/usermanagerfs";

const server = express();

const PORT = 8080;
const ready = () => console.log("Server ready on port " + PORT);

const userManager = new UserManager();

server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

server.get("/api/users", async (req, res) => {
    try {
        const all = await userManager.getUsers();
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

server.get("/api/users/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await userManager.getUserById(parseInt(uid));
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
