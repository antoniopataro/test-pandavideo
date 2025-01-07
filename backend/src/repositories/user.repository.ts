import { PrismaClient } from "@prisma/client";

export class UserRepository {
  constructor(private readonly database: PrismaClient) {}

  public async create(data: any): Promise<any> {
    return await this.database.users.create({
      data,
    });
  }
}
