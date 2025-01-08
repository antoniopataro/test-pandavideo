type VideoEntityAttributes = {
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
};

export class VideoEntity {
  private backup: boolean;
  private converted_at: string | null;
  private created_at: string;
  private description: string;
  private folder_id: string | null;
  private height: number;
  private id: string;
  private length: number;
  private library_id: string;
  private live_id: string | null;
  private playable: boolean;
  private playback: string[];
  private preview: string;
  private status: string;
  private storage_size: number;
  private thumbnail: string;
  private title: string;
  private updated_at: string;
  private user_id: string;
  private video_external_id: string;
  private video_hls: string;
  private video_player: string;
  private width: number;

  constructor({
    backup,
    converted_at,
    created_at,
    description,
    folder_id,
    height,
    id,
    length,
    library_id,
    live_id,
    playable,
    playback,
    preview,
    status,
    storage_size,
    thumbnail,
    title,
    updated_at,
    user_id,
    video_external_id,
    video_hls,
    video_player,
    width,
  }: VideoEntityAttributes) {
    this.backup = backup;
    this.converted_at = converted_at;
    this.created_at = created_at;
    this.description = description;
    this.folder_id = folder_id;
    this.height = height;
    this.id = id;
    this.length = length;
    this.library_id = library_id;
    this.live_id = live_id;
    this.playable = playable;
    this.playback = playback;
    this.preview = preview;
    this.status = status;
    this.storage_size = storage_size;
    this.thumbnail = thumbnail;
    this.title = title;
    this.updated_at = updated_at;
    this.user_id = user_id;
    this.video_external_id = video_external_id;
    this.video_hls = video_hls;
    this.video_player = video_player;
    this.width = width;
  }
}
