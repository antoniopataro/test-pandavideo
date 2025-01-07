import { envs } from "@/config/envs";
import { UserRepository } from "@/repositories/user.repository";
import jwt from "jsonwebtoken";

type Params = {
  email: string;
  name: string;
};

type Result = {
  token: string;
};

export class RegisterUserCommand {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(params: Params): Promise<Result> {
    try {
      await this.userRepository.create({
        email: params.email,
        name: params.name,
      });

      const token = jwt.sign({ email: params.email }, envs.JWT_SECRET);

      return {
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
