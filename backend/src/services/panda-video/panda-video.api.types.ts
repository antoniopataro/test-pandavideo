export type PandaVideoListVideosRequestParams = {
  folder_id?: string;
  limit?: number;
  page?: number;
  root_folder: number;
  status?: string;
  title?: string;
};

export type PandaVideoListVideosResponse = {
  pages: number;
  total: number;
  videos: {
    backup: boolean;
    converted_at: string | null;
    created_at: string;
    description: string;
    folder_id: string | null;
    height: number;
    id: string;
    length: number;
    library_id: string;
    live_id: string | null;
    playable: boolean;
    playback: string[];
    preview: string;
    status: string;
    storage_size: number;
    thumbnail: string;
    title: string;
    updated_at: string;
    user_id: string;
    video_external_id: string;
    video_hls: string;
    video_player: string;
    width: number;
  }[];
};
