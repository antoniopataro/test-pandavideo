import { PandaVideoService } from "@/services/panda-video.service";
import { logger } from "@/utils/logger";
import { VideoEntity } from "../entities/video.entity";

type Params = {
  panda_video_video_id: string;
};

type Result = {
  video: VideoEntity;
};

export class GetVideoDetailsCommand {
  constructor(private readonly pandaVideoService: PandaVideoService) {}

  public async execute(params: Params): Promise<Result> {
    try {
      logger.info("GetVideoDetailsCommand initiated");

      const getVideoDetailsFromPandaVideoResponse =
        await this.getVideoDetailsFromPandaVideo(params);

      logger.info("GetVideoDetailsCommand finished");

      return {
        video: getVideoDetailsFromPandaVideoResponse,
      };
    } catch (error) {
      logger.info("GetVideoDetailsCommand failed");

      throw error;
    }
  }

  private async getVideoDetailsFromPandaVideo(
    params: Params,
  ): Promise<VideoEntity> {
    return await this.pandaVideoService.getVideoDetails(
      params.panda_video_video_id,
    );
  }
}
