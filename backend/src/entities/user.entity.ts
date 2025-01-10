import bcrypt from "bcryptjs";

type UserEntityAttributes = {
  created_at: Date;
  email: string;
  id: string;
  name: string | null;
  password: string;
  updated_at: Date;
};

export type UserEntityJWT = {
  createdAt: Date;
  email: string;
  id: string;
  name: string | null;
  updatedAt: Date;
};

export class UserEntity {
  private created_at: Date;
  private email: string;
  private id: string;
  private name: string | null;
  private password: string;
  private updated_at: Date;

  constructor({
    created_at,
    email,
    id,
    name,
    password,
    updated_at,
  }: UserEntityAttributes) {
    this.created_at = created_at;
    this.email = email;
    this.id = id;
    this.name = name;
    this.password = password;
    this.updated_at = updated_at;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  public toJWT(): UserEntityJWT {
    return {
      createdAt: this.created_at,
      email: this.email,
      id: this.id,
      name: this.name,
      updatedAt: this.updated_at,
    };
  }
}
