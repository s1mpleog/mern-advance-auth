import { Request, Response, NextFunction } from "express";
import CatchAsyncError from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../config/redis";

// AUTHENTICATED USER
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decodedToken) {
      return next(new ErrorHandler("Access Token is not valid", 401));
    }

    const user = await redis.get(decodedToken.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = JSON.parse(user);

    next();
  }
);

// validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role ${req.user?.role} is not allowed to access this resource`,
          401
        )
      );
    }
    next();
  };
};
