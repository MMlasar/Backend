import { Router } from "express";
import UserManager from "../sprint_2/usermanagerfs.js";
import propsusers from "../../middlewares/propsUsers.mid.js";

const userRouter = Router();
const userManager = new UserManager();

userRouter.get("/", propsusers, async (req, res, next) => {
    try {
        const allUsers = await userManager.getUsers();
        return res.status(200).json(allUsers);
    } catch (error) {
        return next(error);
    }
});

userRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await userManager.getUserById(parseInt(uid, 10));
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        return next(error);
    }
});

userRouter.post("/", async (req, res, next) => {
    try {
        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        return next(error);
    }
});

userRouter.put("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
        });
    } catch (error) {
        return next(error);
    }
});

userRouter.delete("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return next(error);
    }
});

export default userRouter;
