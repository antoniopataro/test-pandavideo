import { App } from "../app";
import { UserRouter } from "./user.router";
import { VideoRouter } from "./video.router";

export class Router {
  constructor(private readonly app: App) {
    new UserRouter(this.app);
    new VideoRouter(this.app);
  }
}
