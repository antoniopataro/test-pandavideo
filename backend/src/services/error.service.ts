import { StatusCode } from "@/constants";
import { BaseError } from "@/utils/errors";
import { logger } from "@/utils/logger";
import { Response } from "express";

export class ErrorService {
  constructor(private readonly res: Response) {}

  public handleError(error: unknown): void {
    logger.error(error);

    if (error instanceof BaseError) {
      this.res.status(error.statusCode).send({
        error: error.message,
      });

      return;
    }

    this.res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      error: "unexpected error",
    });
  }
}
