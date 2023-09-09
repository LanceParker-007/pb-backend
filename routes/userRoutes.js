import express from "express";
import { register, setScore } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(register);

userRouter.route("/setscore").post(protect, setScore);

export default userRouter;
