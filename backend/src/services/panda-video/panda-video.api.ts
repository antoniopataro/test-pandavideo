import axios, { AxiosError, AxiosInstance } from "axios";
import {
  PandaVideoGetVideoDetailsResponse,
  PandaVideoListVideosRequestParams,
  PandaVideoListVideosResponse,
} from "./panda-video.api.types";
import { envs } from "@/config/envs";
import { BaseError } from "@/utils/errors";

export class PandaVideoAPI {
  public readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://api-v2.pandavideo.com.br/",
      headers: {
        Accept: "application/json",
        Authorization: `${envs.PANDA_VIDEO_API_KEY}`,
      },
    });
  }

  public async getVideoDetails(video_id: string) {
    try {
      return await this.api.get<PandaVideoGetVideoDetailsResponse>(
        `/videos/${video_id}`,
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): AxiosError | BaseError | unknown {
    if (error instanceof AxiosError) {
      const { response, status } = error;

      if (!response) {
        return error;
      }

      const { data } = response;

      const message = data.errMsg;

      if (!message) {
        return new BaseError("unknown error", status);
      }

      return new BaseError(message, status);
    }

    return error;
  }

  public async listVideos(
    params: PandaVideoListVideosRequestParams = {
      root_folder: 1,
    },
  ) {
    try {
      return await this.api.get<PandaVideoListVideosResponse>("/videos", {
        params,
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
