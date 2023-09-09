import express from "express";
import { getScore, register, setScore } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(register);

userRouter.route("/setscore").post(protect, setScore);

userRouter.route("/getscore").get(protect, getScore);

export default userRouter;
