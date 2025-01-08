import { Request, Response } from "express";
import { ListVideosCommand } from "@/use-cases/list-videos.command";
import { StatusCode } from "@/constants";
import { ErrorService } from "@/services/error.service";
import { PandaVideoService } from "@/services/panda-video.service";
import { PandaVideoAPI } from "@/services/panda-video/panda-video.api";
import { VideoValidator } from "@/validators/video.validator";
import { App } from "@/app";

export class VideoController {
  private readonly pandaVideoService: PandaVideoService;
  private readonly videoValidator: VideoValidator;

  constructor(private readonly app: App) {
    this.pandaVideoService = new PandaVideoService(new PandaVideoAPI());
    this.videoValidator = new VideoValidator();
  }

  public async listVideos(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { query } = req;

      const data = this.videoValidator.validateListVideos(query);
      const { limit, page, status, title } = data;

      const listVideosCommand = new ListVideosCommand(
        this.pandaVideoService,
        this.app.redis,
      );

      const result = await listVideosCommand.execute({
        limit: parseInt(limit, 10),
        page: parseInt(page, 10),
        status,
        title,
      });

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }
}
