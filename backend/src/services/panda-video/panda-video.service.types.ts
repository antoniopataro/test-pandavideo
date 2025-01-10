import { FolderEntity } from "@/entities/folder.entity";
import { VideoEntity } from "@/entities/video.entity";

export type PandaVideoGetVideoDetailsResponse = VideoEntity;

export type PandaVideoListFoldersResponse = {
  folders: FolderEntity[];
};

export type PandaVideoListVideosResponse = {
  pages: number;
  total: number;
  videos: VideoEntity[];
};

export type PandaVideoUpdateVideoPropertiesResponse = VideoEntity;
