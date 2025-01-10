import { PandaVideoService } from "@/services/panda-video.service";
import { logger } from "@/utils/logger";
import { VideoEntity } from "../entities/video.entity";
import { RedisService } from "@/services/redis.service";
import { PandaVideoListVideosResponse } from "@/services/panda-video/panda-video.service.types";

type Params = {
  folder_id?: string;
  limit?: number;
  page?: number;
  root_folder?: number;
  status?: string;
  title?: string;
};

type Result = {
  pages: number;
  total: number;
  videos: VideoEntity[];
};

export class ListVideosCommand {
  constructor(
    private readonly pandaVideoService: PandaVideoService,
    private readonly redisService: RedisService,
  ) {}

  public async execute(params: Params): Promise<Result> {
    try {
      logger.info("ListVideosCommand initiated");

      const cacheKey = this.buildCacheKey(params);

      const listVideosFromCacheResponse =
        await this.listVideosFromCache(cacheKey);

      if (listVideosFromCacheResponse) {
        return this.buildResult(listVideosFromCacheResponse);
      }

      const listVideosFromPandaVideoResponse =
        await this.listVideosFromPandaVideo(params);

      void this.cacheListVideosResponse(
        cacheKey,
        listVideosFromPandaVideoResponse,
      );

      logger.info("ListVideosCommand finished");

      return this.buildResult(listVideosFromPandaVideoResponse);
    } catch (error) {
      logger.info("ListVideosCommand failed");

      throw error;
    }
  }

  private buildCacheKey(params: Params): string {
    return JSON.stringify(params);
  }

  private buildResult(
    listVideosResponse: PandaVideoListVideosResponse,
  ): Result {
    const { pages, total, videos } = listVideosResponse;

    return {
      pages,
      total,
      videos,
    };
  }

  private async cacheListVideosResponse(
    cacheKey: string,
    listVideosFromPandaVideoResponse: PandaVideoListVideosResponse,
  ): Promise<void> {
    await this.redisService.set(cacheKey, listVideosFromPandaVideoResponse, 20);
  }

  private async listVideosFromCache(
    cacheKey: string,
  ): Promise<null | PandaVideoListVideosResponse> {
    return this.redisService.get<PandaVideoListVideosResponse>(cacheKey);
  }

  private async listVideosFromPandaVideo(
    params: Params,
  ): Promise<PandaVideoListVideosResponse> {
    return await this.pandaVideoService.listVideos({
      folder_id: params.folder_id,
      limit: params.limit,
      page: params.page,
      root_folder: params.root_folder,
      status: params.status,
      title: params.title,
    });
  }
}
