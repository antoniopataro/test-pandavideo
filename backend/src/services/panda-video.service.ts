import { VideoEntity } from "@/entities/video.entity";
import { PandaVideoAPI } from "./panda-video/panda-video.api";
import { PandaVideoListVideosRequestParams } from "./panda-video/panda-video.api.types";
import { PandaVideoListVideosResponse } from "./panda-video/panda-video.service.types";

export class PandaVideoService {
  constructor(private readonly pandaVideoAPI: PandaVideoAPI) {}

  public async getVideoDetails(video_id: string): Promise<VideoEntity> {
    const getVideoDetailsResponse =
      await this.pandaVideoAPI.getVideoDetails(video_id);

    const { data } = getVideoDetailsResponse;

    return new VideoEntity({
      backup: data.backup,
      converted_at: data.converted_at,
      created_at: data.created_at,
      description: data.description,
      folder_id: data.folder_id,
      height: data.height,
      id: data.id,
      length: data.length,
      library_id: data.library_id,
      live_id: data.live_id,
      playable: data.playable,
      playback: data.playback,
      preview: data.preview,
      status: data.status,
      storage_size: data.storage_size,
      thumbnail: data.thumbnail,
      title: data.title,
      updated_at: data.updated_at,
      user_id: data.user_id,
      video_external_id: data.video_external_id,
      video_hls: data.video_hls,
      video_player: data.video_player,
      width: data.width,
    });
  }

  public async listVideos(
    params: PandaVideoListVideosRequestParams,
  ): Promise<PandaVideoListVideosResponse> {
    const listVideosResponse = await this.pandaVideoAPI.listVideos(params);

    const { data } = listVideosResponse;

    return {
      pages: data.pages,
      total: data.total,
      videos: data.videos.map(
        (video) =>
          new VideoEntity({
            backup: video.backup,
            converted_at: video.converted_at,
            created_at: video.created_at,
            description: video.description,
            folder_id: video.folder_id,
            height: video.height,
            id: video.id,
            length: video.length,
            library_id: video.library_id,
            live_id: video.live_id,
            playable: video.playable,
            playback: video.playback,
            preview: video.preview,
            status: video.status,
            storage_size: video.storage_size,
            thumbnail: video.thumbnail,
            title: video.title,
            updated_at: video.updated_at,
            user_id: video.user_id,
            video_external_id: video.video_external_id,
            video_hls: video.video_hls,
            video_player: video.video_player,
            width: video.width,
          }),
      ),
    };
  }
}
