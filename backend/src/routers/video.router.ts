import { App } from "@/app";
import { VideoController } from "@/controllers/video.controller";
import { jwtMiddleware } from "@/middlewares/jwt.middleware";
import { Router } from "express";

export class VideoRouter {
  private readonly router: Router;
  private readonly videoController: VideoController;

  constructor(private readonly app: App) {
    this.videoController = new VideoController(this.app);

    this.router = Router();
    this.router.use(jwtMiddleware);

    this.addRoutes();

    this.app.server.use("/videos", this.router);
  }

  private addRoutes(): void {
    this.router.get("/", (req, res) =>
      this.videoController.listVideos(req, res),
    );

    this.router.get("/:id", (req, res) =>
      this.videoController.getVideoDetails(req, res),
    );

    this.router.put("/:id", (req, res) =>
      this.videoController.updateVideoProperties(req, res),
    );
  }
}
