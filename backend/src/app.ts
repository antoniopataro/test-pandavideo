import express, { Express } from "express";

import { envs } from "./config/envs";
import { DatabaseService } from "./services/database.service";
import { Router } from "./routers";
import { logger } from "./utils/logger";
import { jsonMiddleware } from "./middlewares/json.middleware";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { RedisService } from "./services/redis.service";

export class App {
  private readonly port: string;

  public readonly database: DatabaseService;
  public readonly redis: RedisService;
  public readonly server: Express;

  constructor() {
    this.port = envs.SERVER_PORT;

    this.database = new DatabaseService();
    this.redis = new RedisService();

    this.server = express();

    this.setupMiddlewares();
    this.setupRoutes();
  }

  private listen(): void {
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

  public async start(): Promise<void> {
    await this.database.runMigrations();

    this.listen();
  }
}
