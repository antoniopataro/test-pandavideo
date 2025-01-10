import { envs } from "@/config/envs";
import { UserRepository } from "@/repositories/user.repository";
import jwt from "jsonwebtoken";
import { UserEntity } from "../entities/user.entity";
import { NotFoundError, UnauthorizedError } from "@/utils/errors";
import { logger } from "@/utils/logger";

type Params = {
  email: string;
  password: string;
};

type Result = {
  token: string;
};

export class LoginUserCommand {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(params: Params): Promise<Result> {
    try {
      logger.info("LoginUserCommand initiated");

      const { user } = await this.getRelatedEntities(params);

      await this.guardAgainstInvalidPassword(params, user);

      const token = this.generateToken(user);

      logger.info("LoginUserCommand finished");

      return {
        token,
      };
    } catch (error) {
      logger.info("LoginUserCommand failed");

      throw error;
    }
  }

  private generateToken(user: UserEntity): string {
    const payload = user.toJWT();

    return jwt.sign(payload, envs.JWT_SECRET);
  }

  private async getRelatedEntities(
    params: Params,
  ): Promise<{ user: UserEntity }> {
    const user = await this.userRepository.findByEmail(params.email);

    if (!user) {
      throw new NotFoundError("user with provided email does not exist");
    }

    return {
      user,
    };
  }

  private async guardAgainstInvalidPassword(
    params: Params,
    user: UserEntity,
  ): Promise<void> {
    const isCorrectPassword = await user.comparePassword(params.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedError("incorrect password");
    }
  }
}
