import { genSaltSync, hashSync, compareSync  } from "bcrypt";
import { Db } from "mongodb";

const createHash = (password)=> hashSync(password, genSaltSync(10));
const verifayHash = (req,Db) => compareSync(req,Db);

export { createHash , verifayHash };

