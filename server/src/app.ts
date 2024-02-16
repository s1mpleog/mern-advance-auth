import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/error.middleware";

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(morgan("dev"));

// importing routes
import userRouter from "./routes/user.route";

// using routes
app.use("/api/v1", userRouter);

// unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found.`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
