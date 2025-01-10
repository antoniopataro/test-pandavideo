import { App } from "@/app";
import { FolderController } from "@/controllers/folder.controller";
import { jwtMiddleware } from "@/middlewares/jwt.middleware";
import { Router } from "express";

export class FolderRouter {
  private readonly router: Router;
  private readonly folderController: FolderController;

  constructor(private readonly app: App) {
    this.folderController = new FolderController(this.app);

    this.router = Router();
    this.router.use(jwtMiddleware);

    this.addRoutes();

    this.app.server.use("/folders", this.router);
  }

  private addRoutes(): void {
    this.router.get("/", (req, res) =>
      this.folderController.listFolders(req, res),
    );
  }
}
