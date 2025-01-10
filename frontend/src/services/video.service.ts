import { Service } from ".";
import { failure, success, type Either } from "../utils/either";
import {
  type GetVideoDetailsResponse,
  type ListVideosResponse,
} from "./video.service.types";
import { type ListVideosRequestParams } from "./video.service.types";

class VideoService extends Service {
  public async getVideoDetails(
    id: string
  ): Promise<Either<Error, GetVideoDetailsResponse>> {
    try {
      const result = await this.api
        .get<GetVideoDetailsResponse>(`/videos/${id}`)
        .then(({ data }) => data);

      return success(result);
    } catch (error) {
      return failure(this.handleError(error));
    }
  }
  public async listVideos(
    params: ListVideosRequestParams
  ): Promise<Either<Error, ListVideosResponse>> {
    try {
      const result = await this.api
        .get<ListVideosResponse>("/videos", { params })
        .then(({ data }) => data);

      return success(result);
    } catch (error) {
      return failure(this.handleError(error));
    }
  }
}

export const videoService = new VideoService();
