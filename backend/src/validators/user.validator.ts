/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";
import { Validator } from ".";

const validateLoginUserSchema = z.object({
  email: z
    .string({ message: "missing email" })
    .min(1, "invalid email length")
    .email("malformatted email"),
  password: z
    .string({ message: "missing password" })
    .min(1, "invalid password length"),
});

const validateRegisterUserSchema = validateLoginUserSchema;

export class UserValidator extends Validator {
  public validateLoginUser(data: any): z.infer<typeof validateLoginUserSchema> {
    try {
      return validateLoginUserSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public validateRegisterUser(
    data: any,
  ): z.infer<typeof validateRegisterUserSchema> {
    try {
      return validateRegisterUserSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
