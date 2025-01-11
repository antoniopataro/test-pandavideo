import { execSync } from "child_process";

import { PrismaClient } from "@prisma/client";

import { logger } from "../utils/logger";

export class DatabaseService extends PrismaClient {
  public async runMigrations(): Promise<void> {
    try {
      logger.info("running database migrations...");

      execSync("npx prisma migrate deploy");

      logger.info("database migrations completed successfully");
    } catch (error) {
      logger.error(`failed to run startup tasks: ${error}`);
      throw error;
    } finally {
      await this.$disconnect();
    }
  }
}
