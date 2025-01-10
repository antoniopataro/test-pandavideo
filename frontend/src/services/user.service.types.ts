import { type User } from "../models/user.model";

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginRequestResponse = {
  token: string;
};

export type LoginResponse = {
  user: User;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterRequestResponse = {
  token: string;
};

export type RegisterResponse = {
  user: User;
};
