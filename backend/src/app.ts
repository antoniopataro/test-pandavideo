import express, { Express } from "express";
import { envs } from "./config/envs";
import { Routes } from "./routes";
import { PrismaClient } from "@prisma/client";

export class App {
  private readonly port: string;

  public readonly database: PrismaClient;
  public readonly server: Express;

  constructor() {
    this.database = new PrismaClient();

    this.port = envs.SERVER_PORT;
    this.server = express();
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`server is running on port ${this.port}`);
    });
  }

  public setupMiddlewares(): void {
    this.server.use(express.json());
  }

  public setupRoutes(): void {
    new Routes(this);
  }
}
