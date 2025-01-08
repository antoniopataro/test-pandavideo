import { Request, Response } from "express";
import { App } from "../app";
import { UserRepository } from "@/repositories/user.repository";
import { RegisterUserCommand } from "@/use-cases/register-user.command";
import { StatusCode } from "@/constants";
import { ErrorService } from "@/services/error.service";
import { UserValidator } from "@/validators/user.validator";

export class UserController {
  private readonly userRepository: UserRepository;
  private readonly userValidator: UserValidator;

  constructor(private readonly app: App) {
    this.userRepository = new UserRepository(this.app.database);
    this.userValidator = new UserValidator();
  }

  public async register(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { body } = req;

      const data = this.userValidator.validateRegisterUser(body);
      const { email, password } = data;

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
