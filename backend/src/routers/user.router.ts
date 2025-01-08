import { App } from "@/app";
import { UserController } from "@/controllers/user.controller";
import { Router } from "express";

export class UserRouter {
  private readonly router: Router;
  private readonly userController: UserController;

  constructor(private readonly app: App) {
    this.router = Router();
    this.userController = new UserController(this.app);

    this.addRoutes();

    this.app.server.use("/users", this.router);
  }

  private addRoutes(): void {
    this.router.post("/register", (req, res) =>
      this.userController.register(req, res)
    );
  }
}
