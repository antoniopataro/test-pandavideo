type FolderEntityAttributes = {
  created_at: string;
  id: string;
  name: string;
  parent_folder_id: string | null;
  status: boolean;
  updated_at: string;
  user_id: string;
  videos_count: string;
};

export class FolderEntity {
  private created_at: string;
  private id: string;
  private name: string;
  private parent_folder_id: string | null;
  private status: boolean;
  private updated_at: string;
  private user_id: string;
  private videos_count: string;

  constructor({
    created_at,
    id,
    name,
    parent_folder_id,
    status,
    updated_at,
    user_id,
    videos_count,
  }: FolderEntityAttributes) {
    this.created_at = created_at;
    this.id = id;
    this.name = name;
    this.parent_folder_id = parent_folder_id;
    this.status = status;
    this.updated_at = updated_at;
    this.user_id = user_id;
    this.videos_count = videos_count;
  }
}
