import { type Video } from "../models/video.model";

export type GetVideoDetailsResponse = {
  video: Video;
};

export type ListVideosRequestParams = {
  description?: string;
  limit: number;
  page: number;
  title?: string;
};

export type ListVideosResponse = {
  pages: number;
  total: number;
  videos: Video[];
};
