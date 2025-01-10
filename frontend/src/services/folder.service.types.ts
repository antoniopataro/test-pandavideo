import { type Folder } from "../models/folder.model";

export type ListFoldersRequestParams = {
  name?: string;
  parent_folder_id?: string;
};

export type ListFoldersResponse = {
  folders: Folder[];
};
