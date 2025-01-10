import { type Video } from "../models/video.model";

export type GetVideoDetailsResponse = {
  video: Video;
};

export type ListVideosRequestParams = {
  description?: string;
  folder_id?: string;
  limit: number;
  page: number;
  root_folder?: number;
  title?: string;
};

export type ListVideosResponse = {
  pages: number;
  total: number;
  videos: Video[];
};

export type UpdateVideoPropertiesRequestParams = {
  description?: string;
  folder_id?: string;
  title?: string;
};

export type UpdateVideoPropertiesResponse = Video;
