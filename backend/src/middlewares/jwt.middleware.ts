import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { envs } from "@/config/envs";

import { UserEntity } from "@/domain/entities/user.entity";

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || typeof authHeader !== "string") {
    return res
      .json({
        message: "missing authentication header",
      })
      .status(401);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res
      .json({
        message: "missing authentication token",
      })
      .status(401);
  }

  try {
    const decodedToken = jwt.verify(token, envs.JWT_SECRET);

    const { sub } = decodedToken as JwtPayload;

    if (!sub) {
      return res.status(401).json({ message: "invalid authentication token" });
    }

    const { user } = JSON.parse(sub);

    req.user = new UserEntity(user);

    if (!next) {
      return;
    }

    next();
  } catch {
    return res.status(401).json({ message: "invalid authentication token" });
  }
};
