import { Request, Response } from "express";
import { ListVideosCommand } from "@/use-cases/list-videos.command";
import { StatusCode } from "@/constants";
import { ErrorService } from "@/services/error.service";
import { PandaVideoService } from "@/services/panda-video.service";
import { PandaVideoAPI } from "@/services/panda-video/panda-video.api";
import { VideoValidator } from "@/validators/video.validator";
import { App } from "@/app";
import { GetVideoDetailsCommand } from "@/use-cases/get-video-details.command";
import { UpdateVideoPropertiesCommand } from "@/use-cases/update-video-properties.command";

export class VideoController {
  private readonly pandaVideoService: PandaVideoService;
  private readonly videoValidator: VideoValidator;

  constructor(private readonly app: App) {
    this.pandaVideoService = new PandaVideoService(new PandaVideoAPI());
    this.videoValidator = new VideoValidator();
  }

  public async getVideoDetails(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { params } = req;

      const data = this.videoValidator.validateGetVideoDetails(params);
      const { id } = data;

      const getVideoDetailsCommand = new GetVideoDetailsCommand(
        this.pandaVideoService,
      );

      const result = await getVideoDetailsCommand.execute({
        panda_video_video_id: id,
      });

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }

  public async listVideos(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { query } = req;

      const data = this.videoValidator.validateListVideos(query);
      const { folder_id, limit, page, root_folder, status, title } = data;

      const listVideosCommand = new ListVideosCommand(
        this.pandaVideoService,
        this.app.redis,
      );

      const result = await listVideosCommand.execute({
        folder_id,
        limit: parseInt(limit, 10),
        page: parseInt(page, 10),
        root_folder: root_folder ? parseInt(root_folder, 10) : undefined,
        status,
        title,
      });

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }

  public async updateVideoProperties(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { body, params } = req;

      const data = this.videoValidator.validateUpdateVideoProperties({
        id: params.id,
        properties: body,
      });
      const { id, properties } = data;

      const updateVideoPropertiesCommand = new UpdateVideoPropertiesCommand(
        this.pandaVideoService,
      );

      const result = await updateVideoPropertiesCommand.execute({
        panda_video_video_id: id,
        properties,
      });

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }
}
