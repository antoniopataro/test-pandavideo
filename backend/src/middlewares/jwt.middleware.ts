import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

import { envs } from "@/config/envs";
import { UserEntity, UserEntityJWT } from "@/entities/user.entity";
import { StatusCode } from "@/constants";

export const jwtMiddleware = ((
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: "missing authentication header",
    });
  }

  const [scheme, token] = authHeader.split(" ");

  if (!token || !["Bearer", "JWT"].includes(scheme)) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: "malformatted authentication header",
    });
  }

  try {
    const decodedToken = jwt.verify(token, envs.JWT_SECRET) as UserEntityJWT;

    req.user = new UserEntity({
      created_at: decodedToken.createdAt,
      email: decodedToken.email,
      id: decodedToken.id,
      name: decodedToken.name,
      password: "",
      updated_at: decodedToken.updatedAt,
    });

    next();

    return;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(StatusCode.UNAUTHORIZED).json({
        message: "token has expired",
      });

      return;
    }

    res.status(StatusCode.UNAUTHORIZED).json({
      message: "invalid authentication token",
    });
  }
}) as RequestHandler;
