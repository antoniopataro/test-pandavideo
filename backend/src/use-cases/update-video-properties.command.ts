import { PandaVideoService } from "@/services/panda-video.service";
import { logger } from "@/utils/logger";
import { VideoEntity } from "../entities/video.entity";
import { PandaVideoUpdateVideoPropertiesResponse } from "@/services/panda-video/panda-video.service.types";

type Params = {
  panda_video_video_id: string;
  properties: {
    description?: string;
    folder_id?: string;
    title?: string;
  };
};

type Result = VideoEntity;

export class UpdateVideoPropertiesCommand {
  constructor(private readonly pandaVideoService: PandaVideoService) {}

  public async execute(params: Params): Promise<Result> {
    try {
      logger.info("UpdateVideoPropertiesCommand initiated");

      const updatePandaVideoVideoPropertiesResponse =
        await this.updatePandaVideoVideoProperties(params);

      logger.info("UpdateVideoPropertiesCommand finished");

      return updatePandaVideoVideoPropertiesResponse;
    } catch (error) {
      logger.info("UpdateVideoPropertiesCommand failed");

      throw error;
    }
  }

  private async updatePandaVideoVideoProperties(
    params: Params,
  ): Promise<PandaVideoUpdateVideoPropertiesResponse> {
    return await this.pandaVideoService.updateVideoProperties(
      params.panda_video_video_id,
      params.properties,
    );
  }
}
