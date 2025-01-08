/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCode } from "@/constants";

export abstract class BaseError extends Error {
  public abstract statusCode: StatusCode;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export class ConflictError extends BaseError {
  public statusCode = StatusCode.CONFLICT;

  constructor(message: string, data?: any) {
    super(message, data);
  }
}
