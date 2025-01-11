import { Service } from ".";
import { failure, success, type Either } from "../utils/either";
import {
  type GetVideoDetailsResponse,
  type ListVideosRequestParams,
  type ListVideosResponse,
  type UpdateVideoPropertiesRequestParams,
  type UpdateVideoPropertiesResponse,
} from "./video.service.types";

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
        .get<ListVideosResponse>("/videos", {
          params: {
            description: params.description || undefined,
            folder_id: params.folder_id || undefined,
            limit: params.limit,
            page: params.page,
            root_folder: params.root_folder || undefined,
            title: params.title || undefined,
          },
        })
        .then(({ data }) => data);

      return success(result);
    } catch (error) {
      return failure(this.handleError(error));
    }
  }

  public async updateVideoProperties(
    id: string,
    body: UpdateVideoPropertiesRequestParams
  ): Promise<Either<Error, UpdateVideoPropertiesResponse>> {
    try {
      const result = await this.api
        .put<UpdateVideoPropertiesResponse>(`/videos/${id}`, body)
        .then(({ data }) => data);

      return success(result);
    } catch (error) {
      return failure(this.handleError(error));
    }
  }
}

export const videoService = new VideoService();
