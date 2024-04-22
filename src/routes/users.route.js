import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { userValidationMiddleWare } from "../middlewares/user.middleware.js";

const userRoute = Router();

// userRoute.use(authMiddleware);

userRoute.get("/",  userController.getAllUsers);


export default userRoute;
