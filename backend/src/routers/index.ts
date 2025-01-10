import { App } from "../app";
import { FolderRouter } from "./folder.router";
import { UserRouter } from "./user.router";
import { VideoRouter } from "./video.router";

export class Router {
  constructor(private readonly app: App) {
    new FolderRouter(this.app);
    new UserRouter(this.app);
    new VideoRouter(this.app);
  }
}
