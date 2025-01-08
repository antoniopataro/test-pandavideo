import express, { Express } from "express";
import { envs } from "./config/envs";
import { Router } from "./routers";
import { PrismaClient } from "@prisma/client";
import { logger } from "./utils/logger";
import { jsonMiddleware } from "./middlewares/json.middleware";
import { corsMiddleware } from "./middlewares/cors.middleware";

export class App {
  private readonly port: string;

  public readonly database: PrismaClient;
  public readonly server: Express;

  constructor() {
    this.database = new PrismaClient();

    this.port = envs.SERVER_PORT;
    this.server = express();

    this.setupMiddlewares();
    this.setupRoutes();
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      logger.info(`server is running on port ${this.port}`);
    });
  }

  private setupMiddlewares(): void {
    this.server.use(corsMiddleware);
    this.server.use(jsonMiddleware);
  }

  private setupRoutes(): void {
    new Router(this);
  }
}
