import { Router } from "express";
import * as blogController from "../controllers/blog.controller.js";
import { creatBlogMiddleware } from "../middlewares/blog.middleware.js";
import client from "../integrations/redis.js"

const blogRoute = Router();

// postRoute.use(authMiddleware);


blogRoute.get("/",  blogController.getAll);
blogRoute.post("/",  blogController.create);
blogRoute.get("/",  blogController.getUserBlog);
blogRoute.get("/",  blogController.getOne);
blogRoute.put("/:postID",  blogController.update);
blogRoute.delete("/:postID",  blogController.Delete);


export default blogRoute;