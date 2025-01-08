import {
  BadRequestError,
  BaseError,
  InternalServerError,
} from "@/utils/errors";
import { ZodError } from "zod";

export abstract class Validator {
  public handleError(error: unknown): BaseError {
    if (error instanceof ZodError) {
      return new BadRequestError(
        `validation failed: ${error.errors.map((e) => e.message).join(", ")}`,
      );
    }

    return new InternalServerError("unknown error");
  }
}
