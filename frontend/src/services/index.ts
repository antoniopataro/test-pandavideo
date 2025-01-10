import { AxiosError } from "axios";
import { api } from "../plugins/api";
import { ERROR_MESSAGES } from "../constants/errors";

export abstract class Service {
  public readonly api = api;

  public handleError(error: unknown): Error {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (!response) {
        return new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }

      const { data, status } = response;

      if (!data) {
        if (status === 400) {
          return new Error(ERROR_MESSAGES.BAD_REQUEST_ERROR);
        }

        if (status === 403) {
          return new Error(ERROR_MESSAGES.FORBIDDEN_ERROR);
        }

        if (status === 409) {
          return new Error(ERROR_MESSAGES.CONFLICT_ERROR);
        }

        if (status === 500) {
          return new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }

        return new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
      }

      if ("error" in data && typeof data.error === "string") {
        let formattedErrorMessage = "";

        const { error } = data as {
          error: string;
        };

        formattedErrorMessage = error.endsWith(".") ? error : `${error}.`;
        formattedErrorMessage =
          formattedErrorMessage.charAt(0).toUpperCase() +
          formattedErrorMessage.slice(1);

        return new Error(formattedErrorMessage);
      }

      return new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }

    if (error instanceof Error) {
      return error;
    }

    return new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
}
