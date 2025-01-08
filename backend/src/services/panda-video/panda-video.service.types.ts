import { VideoEntity } from "@/entities/video.entity";

export type PandaVideoListVideosResponse = {
  pages: number;
  total: number;
  videos: VideoEntity[];
};
