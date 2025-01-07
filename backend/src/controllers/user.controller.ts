import { Request, Response } from "express";
import { App } from "../app";
import { UserRepository } from "@/repositories/user.repository";
import { RegisterUserCommand } from "@/use-cases/register-user.command";

export class UserController {
  private readonly userRepository: UserRepository;

  constructor(private readonly app: App) {
    this.userRepository = new UserRepository(this.app.database);
  }

  public async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const registerUserCommand = new RegisterUserCommand(this.userRepository);

      const result = await registerUserCommand.execute({
        email,
        name: "test",
      });

      res.status(201).send(result);
    } catch (error) {
      console.error(error);

      res.status(500).end();
    }
  }
}
