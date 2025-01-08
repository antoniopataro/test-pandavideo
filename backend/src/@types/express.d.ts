declare namespace Express {
  export interface Request {
    user?: Omit<import("@/domain/entities/user.entity").UserEntity, "password">;
  }
}
