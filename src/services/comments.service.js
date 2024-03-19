import { comments } from "../data/mongo/manager.mongo.js";

class CommentsService {
    constructor () {
        this.model = comments
    };
    create = async data => await this.model.create(data);
    read = async ({ filter, options }) => await this.model.read({ filter, options });
    readOne = async id => await this.model.readOne(id);
    update = async data => await this.model.update(id,data);
    destroy = async id => await this.model.destroy(id);  
};

const service = new CommentsService();
export default service;