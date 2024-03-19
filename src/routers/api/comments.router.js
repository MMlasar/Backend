import CustomRouter from "../customRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/comments.controlers.js";

class CommentsRouter extends CustomRouter{
    init() {
        this.create("/", ["USER","PREM"], create );
        this.read("/", ["PUBLIC"], read );
        this.readOne("/:cid", ["PUBLIC"], readOne );
        this.update("/:cid", ["USER","PREM"], update);
        this.destroy("/:cid", ["USER","PREM"], destroy);
    };
}

let commentsRouter = new CommentsRouter();
commentsRouter= commentsRouter.getRouter();

export default commentsRouter;