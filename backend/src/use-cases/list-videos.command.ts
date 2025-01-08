import { PandaVideoService } from "@/services/panda-video.service";
import { logger } from "@/utils/logger";
import { VideoEntity } from "../entities/video.entity";

type Params = {
  limit: number;
  page: number;
  status?: string;
  title?: string;
};

type Result = {
  pages: number;
  total: number;
  videos: VideoEntity[];
};

export class ListVideosCommand {
  constructor(private readonly pandaVideoService: PandaVideoService) {}

  public async execute(params: Params): Promise<Result> {
    try {
      logger.info("ListVideosCommand initiated");

      const listVideosResponse = await this.pandaVideoService.listVideos({
        limit: params.limit,
        page: params.page,
        root_folder: 1,
        status: params.status,
        title: params.title,
      });

      logger.info("ListVideosCommand finished");

      return {
        pages: listVideosResponse.pages,
        total: listVideosResponse.total,
        videos: listVideosResponse.videos,
      };
    } catch (error) {
      logger.info("ListVideosCommand failed");

      throw error;
    }
  }
}
