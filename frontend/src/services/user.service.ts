import { jwtDecode } from "jwt-decode";

import { Service } from ".";
import { type User } from "../models/user.model";
import { failure, success, type Either } from "../utils/either";
import {
  type LoginRequestBody,
  type LoginRequestResponse,
  type LoginResponse,
  type RegisterRequest,
  type RegisterRequestResponse,
  type RegisterResponse,
} from "./user.service.types";
import { userHelper } from "../helpers/user.helper";

class UserService extends Service {
  public async login(
    data: LoginRequestBody
  ): Promise<Either<Error, LoginResponse>> {
    try {
      const result = await this.api
        .post<LoginRequestResponse>("/users/login", data)
        .then(({ data }) => data);

      userHelper.setAccessToken(result.token);

      const user = jwtDecode<User>(result.token);

      return success({
        user,
      });
    } catch (error) {
      return failure(this.handleError(error));
    }
  }

  public async register(
    data: RegisterRequest
  ): Promise<Either<Error, RegisterResponse>> {
    try {
      const result = await this.api
        .post<RegisterRequestResponse>("/users/register", data)
        .then(({ data }) => data);

      userHelper.setAccessToken(result.token);

      const user = jwtDecode<User>(result.token);

      return success({
        user,
      });
    } catch (error) {
      return failure(this.handleError(error));
    }
  }
}

export const userService = new UserService();
