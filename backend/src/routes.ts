import { Router } from "express";
import { App } from "./app";
import { UserController } from "./controllers/user.controller";

export class Routes {
  private readonly userController: UserController;

  constructor(private readonly app: App) {
    this.userController = new UserController(this.app);

    this.addUserRoutes();
  }

  private addUserRoutes(): void {
    const router = Router();

    router.post("/register", (req, res) =>
      this.userController.register(req, res)
    );

    this.app.server.use("/users", router);
  }
}
