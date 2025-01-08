import { Request, Response } from "express";
import { App } from "../app";
import { UserRepository } from "@/repositories/user.repository";
import { RegisterUserCommand } from "@/domain/use-cases/register-user.command";
import { StatusCode } from "@/constants";
import { ErrorService } from "@/services/error.service";

export class UserController {
  private readonly userRepository: UserRepository;

  constructor(private readonly app: App) {
    this.userRepository = new UserRepository(this.app.database);
  }

  public async register(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { email, password } = req.body;

      const registerUserCommand = new RegisterUserCommand(this.userRepository);

      const result = await registerUserCommand.execute({
        email,
        password,
      });

      res.status(StatusCode.CREATED).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }
}
