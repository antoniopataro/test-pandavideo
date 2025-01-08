import dotenv from "dotenv";
import { requireEnv } from "../utils/require-env";

dotenv.config();

export const envs = {
  DATABASE_URL: requireEnv("DATABASE_URL"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  PANDA_VIDEO_API_KEY: requireEnv("PANDA_VIDEO_API_KEY"),
  REDIS_URL: requireEnv("REDIS_URL"),
  SERVER_PORT: requireEnv("SERVER_PORT"),
} as const;

export type Envs = typeof envs;
