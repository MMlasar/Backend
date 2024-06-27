import { Router } from "express";
import jwt from "jsonwebtoken";
import { users, products } from "../data/mongo/manager.mongo.js"; // Importa users y products

export default class CustomRouter {
    constructor() {
        this.Router = Router();
        this.init();
    }

    getRouter() {
        return this.Router;
    }

    init() {}

    applyCbs(cbs) {
        return cbs.map(each => async (...params) => {
            try {
                await each.apply(this.params);
            } catch (error) {
                params[1].json({ statuscode: 500, message: error.message });
            }
        });
    }

    policies = (arrayOfPolicies) => async (req, res, next) => {
        try {
            if (arrayOfPolicies.includes("PUBLIC")) return next();
            let token = req.cookies["token"];
            if (!token) return res.error401();
            else {
                const data = jwt.verify(token, process.env.SECRET);
                if (!data) return res.error401("Bad auth by token!");
                else {
                    const { email, role } = data;
                    if (!(role === 0 && arrayOfPolicies.includes("USER")) || (role === 1 && arrayOfPolicies.includes("ADMIN")) || (role === 2 && arrayOfPolicies.includes("PREM"))) {
                        const user = await users.readByEmail(email); // Corrige la función a readByEmail
                        req.user = user;
                        return next();
                    } else {
                        return res.error403();
                    }
                }
            }
        } catch (error) {
            return next();
        }
    };

    create(path, policies, ...cbs) {
        this.Router.post(path, this.policies([policies]), this.applyCbs(cbs));
    }

    read(path, policies, ...cbs) {
        this.Router.get(path, this.policies([policies]), this.applyCbs(cbs));
    }

    update(path, policies, ...cbs) {
        this.Router.put(path, this.policies([policies]), this.applyCbs(cbs));
    }

    destroy(path, policies, ...cbs) {
        this.Router.delete(path, this.policies([policies]), this.applyCbs(cbs));
    }

    use(path, ...cbs) {
        this.Router.use(path, this.applyCbs(cbs));
    }
}
