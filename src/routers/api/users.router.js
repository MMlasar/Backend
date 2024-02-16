import { Router } from "express";
import propsUser from "../../middlewares/propsUser.js";
//import { ManagerUser } from "../../data/fs/user.fs.js"; // Importar ManagerUser de FileSystem
import { users, products } from "../../data/mongo/manager.mongo.js"; // Importar users y products de MongoDB

const usersRouter = Router();

usersRouter.post("/", propsUser, async (req, res, next) => {
    try {
        const userData = req.body;
        const userId = await ManagerUser.create(userData); // Utilizar ManagerUser de FileSystem
        return res.status(201).json({
            statusCode: 201,
            userId: userId,
        });
    } catch (error) {
        return next(error);
    }
});

usersRouter.get('/', async (req, res, next) => {
    try {
        const allUsers = await users.read(); // Utilizar users de MongoDB
        if (allUsers) {
            return res.status(200).json({
                statusCode: 200,
                response: allUsers,
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

usersRouter.get('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await users.readOne(uid); // Utilizar users de MongoDB
        if (user) {
            return res.status(200).json({
                statusCode: 200,
                response: user,
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

usersRouter.put('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const updatedUser = await users.update(uid, data); // Utilizar users de MongoDB
        if (updatedUser) {
            return res.status(200).json({
                statusCode: 200,
                response: updatedUser,
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

usersRouter.delete('/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params;
        const deletedUser = await users.destroy(uid); // Utilizar users de MongoDB
        if (deletedUser) {
            return res.status(200).json({
                statusCode: 200,
                response: deletedUser,
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

export default usersRouter;
