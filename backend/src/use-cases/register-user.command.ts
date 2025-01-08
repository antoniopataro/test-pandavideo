import { envs } from "@/config/envs";
import { UserRepository } from "@/repositories/user.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserEntity } from "../entities/user.entity";
import { ConflictError } from "@/utils/errors";
import { logger } from "@/utils/logger";

type Params = {
  email: string;
  password: string;
};

type Result = {
  token: string;
};

export class RegisterUserCommand {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(params: Params): Promise<Result> {
    try {
      logger.info("RegisterUserCommand initiated");

      await this.guardAgainstExistingUser(params);

      const hashedPassword = await this.hashPassword(params.password);

      const user = await this.userRepository.create({
        email: params.email,
        password: hashedPassword,
      });

      const token = this.generateToken(user);

      logger.info("RegisterUserCommand finished");

      return {
        token,
      };
    } catch (error) {
      logger.info("RegisterUserCommand failed");

      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }

  private generateToken(user: UserEntity): string {
    const payloadd = user.toJWT();

    return jwt.sign(payloadd, envs.JWT_SECRET);
  }

  private async guardAgainstExistingUser(params: Params): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(params.email);

    if (!existingUser) {
      return;
    }

    throw new ConflictError("an user with this email already exists");
  }
}
