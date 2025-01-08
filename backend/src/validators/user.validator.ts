/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";
import { Validator } from ".";

const validateRegisterUserSchema = z.object({
  email: z
    .string({ message: "missing email" })
    .min(1, "invalid email length")
    .email("malformatted email"),
  password: z
    .string({ message: "missing password" })
    .min(1, "invalid password length"),
});

export class UserValidator extends Validator {
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
