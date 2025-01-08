import { UserEntity } from "@/domain/entities/user.entity";
import { PrismaClient } from "@prisma/client";

export type UserCreateAttributes = {
  created_at?: Date;
  email: string;
  id?: string;
  name?: string | null;
  password: string;
  updated_at?: Date;
};

export class UserRepository {
  constructor(private readonly database: PrismaClient) {}

  public async create(data: UserCreateAttributes): Promise<UserEntity> {
    const result = await this.database.user.create({
      data,
    });

    return new UserEntity(result);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.database.user.findUnique({
      where: {
        email,
      },
    });

    if (!result) {
      return null;
    }

    return new UserEntity(result);
  }
}
