import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

config({
  path: "./config.env",
});

const app = express();

app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express({ urlencoded: true }));

app.get("/", (req, res) => {
  return res.send(`Api is running.`);
});

//Auth Routes
app.use("/api/user", userRouter);

export default app;
