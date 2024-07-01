// customRouter.js

import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { users } from '../data/mongo/manager.mongo.js';

export default class CustomRouter {
    constructor() {
        this.router = Router(); // Inicializa el enrutador de Express
    }

    getRouter() {
        return this.router;
    }

    init() {}

    applyCbs(cbs) {
        return cbs.map(each => async (...params) => {
            try {
                await each.apply(this, params); // Aplica los parámetros correctamente
            } catch (error) {
                params[1].json({ statusCode: 500, message: error.message });
            }
        });
    }

    policies = (arrayOfPolicies) => async (req, res, next) => {
        try {
            if (arrayOfPolicies.includes("PUBLIC")) return next();
            let token = req.cookies["token"];
            if (!token) return res.status(401).json({ statusCode: 401, message: "Unauthorized: Token not found" });
            else {
                const data = jwt.verify(token, process.env.SECRET);
                if (!data) return res.status(401).json({ statusCode: 401, message: "Unauthorized: Invalid token" });
                else {
                    const { email, role } = data;
                    if (!(role === 0 && arrayOfPolicies.includes("USER")) || 
                        (role === 1 && arrayOfPolicies.includes("ADMIN")) || 
                        (role === 2 && arrayOfPolicies.includes("PREM"))) {
                        const user = await users.readByEmail(email); // Usa users desde la importación corregida
                        req.user = user;
                        return next();
                    } else {
                        return res.status(403).json({ statusCode: 403, message: "Forbidden: Insufficient privileges" });
                    }
                }
            }
        } catch (error) {
            return next(error);
        }
    };

    create(path, policies, ...cbs) {
        this.router.post(path, this.policies([policies]), ...this.applyCbs(cbs)); // Aplica correctamente los callbacks
    }

    read(path, policies, ...cbs) {
        this.router.get(path, this.policies([policies]), ...this.applyCbs(cbs)); // Aplica correctamente los callbacks
    }

    update(path, policies, ...cbs) {
        this.router.put(path, this.policies([policies]), ...this.applyCbs(cbs)); // Aplica correctamente los callbacks
    }

    destroy(path, policies, ...cbs) {
        this.router.delete(path, this.policies([policies]), ...this.applyCbs(cbs)); // Aplica correctamente los callbacks
    }

    use(path, ...cbs) {
        this.router.use(path, ...this.applyCbs(cbs)); // Aplica correctamente los callbacks
    }
}
