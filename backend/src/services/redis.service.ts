import { envs } from "@/config/envs";
import { Cache } from "@/interfaces/cache";
import { logger } from "@/utils/logger";
import { createClient, RedisClientType } from "redis";

export class RedisService implements Cache {
  private readonly redis: RedisClientType;

  constructor() {
    this.redis = createClient({
      url: envs.REDIS_URL,
    });

    this.redis.on("error", (error) => {
      logger.error(`redis client initialization error: ${error.message}`);
    });

    this.redis.connect().catch(logger.error);
  }

  public async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  }

  public async set<T>(key: string, value: T, ex: number = 3600): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), {
      EX: ex,
    });
  }
}
