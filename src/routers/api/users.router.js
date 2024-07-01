import { Router } from "express";
import propsUser from "../../middlewares/propsUser.js";
import { users, products } from "../../data/mongo/manager.mongo.js";


const usersRouter = Router();

usersRouter.post("/", propsUser, async (req, res, next) => {
    try {
        const userData = req.body;
        const userId = await users.create(userData);
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
        const orderAndPaginate = {
            limit: req.query.limit || 20,
            page: req.query.page || 1,
        };
        const filter = {};
        if (req.query.email) {
            filter.email = new RegExp(req.query.email.trim(), "i");
        }
        const allUsers = await users.read({ filter, orderAndPaginate });
        if (allUsers.docs.length > 0) { // Verificar si hay documentos encontrados
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
        const user = await users.readOne(uid);
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
        const updatedUser = await users.update(uid, data);
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
        const deletedUser = await users.destroy(uid);
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
