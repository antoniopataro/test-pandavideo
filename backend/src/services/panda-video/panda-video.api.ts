import axios, { AxiosError, AxiosInstance } from "axios";
import {
  PandaVideoGetVideoDetailsResponse,
  PandaVideoListFoldersRequestParams,
  PandaVideoListFoldersResponse,
  PandaVideoListVideosRequestParams,
  PandaVideoListVideosResponse,
  PandaVideoUpdateVideoPropertiesRequestBody,
  PandaVideoUpdateVideoPropertiesResponse,
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

  public async getVideoDetails(id: string) {
    try {
      return await this.api.get<PandaVideoGetVideoDetailsResponse>(
        `/videos/${id}`,
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

  public async listFolders(params: PandaVideoListFoldersRequestParams) {
    try {
      return await this.api.get<PandaVideoListFoldersResponse>("/folders", {
        params,
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async listVideos(params: PandaVideoListVideosRequestParams) {
    try {
      return await this.api.get<PandaVideoListVideosResponse>("/videos", {
        params,
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async updateVideoProperties(
    id: string,
    body: PandaVideoUpdateVideoPropertiesRequestBody,
  ) {
    try {
      return await this.api.put<PandaVideoUpdateVideoPropertiesResponse>(
        `/videos/${id}`,
        body,
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
