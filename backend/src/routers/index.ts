import { App } from "../app";
import { UserRouter } from "./user.router";

export class Router {
  constructor(private readonly app: App) {
    new UserRouter(this.app);
  }
}
