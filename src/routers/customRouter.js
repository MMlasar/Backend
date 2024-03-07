import { Router } from "express";
import { Jwt } from "jsonwebtoken";
import { users } from "../data/mongo/manager.mongo.js";

export default class CustomRouter {
    constructor () {
        this.Router = Router()
        this.init()
    }
    getRouter() {
        return this.Router;
    }
    init () {}
    applyCbs (cbs) {
        // cbs es un array de callbacks ( ej todos los middleware que necesita el endopint)
        return cbs.map(each=>async(...params)=>{
            try {
                await each.apply(this,params)
            } catch (error) {
               /* return*/ params [1].json({statuscode:500, message:error.message});
            }
        });
    }

    policies = (arrayOfPolicies) => async (req, res, next) => {
       try {
        if (arrayOfPolicies.includes("PUBLIC")) return next ();
        let token = req.cookies["token"];
        if (!token) return res.error401();
        else {
            const data = Jwt.verify(token, process.env.SECRET);
            if (!data) return res.error401("Bad auth by token!");
            else {
                const { email, role } = data;
                if (!role === 0 && arrayOfPolicies.includes("USER") || role === 1 && arrayOfPolicies.includes("ADMIN") || role === 2 && arrayOfPolicies.includes("PREM")) {
                    const user = await users.readByemal(email);
                    req.user = user;
                    return next();
                } else {
                    return res.error403();
                }
            }
        }
       } catch (error) {
        return next ();
       }
    };
    

    create(path, policies, ...cbs){
        this.Router.post(path,this.responses, this.policies([policies]), this.applyCbs(cbs));
    }

    read(path,policies, ...cbs){
        this.Router.get(path, this.responses, this.policies([policies]),this.applyCbs(cbs));
    }
    update(path,policies, ...cbs){
        this.Router.put(path,this.responses,this.policies([policies]), this.applyCbs(cbs));
    }

    destroy(path,policies, ...cbs){
        this.Router.delete(path, this.responses,this.policies([policies]), this.applyCbs(cbs));
    }

    use(path, ...cbs){
        this.Router.use(path, this.responses,this.applyCbs(cbs));
    }

 }