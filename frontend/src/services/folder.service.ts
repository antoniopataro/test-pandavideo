import { Service } from ".";
import { failure, success, type Either } from "../utils/either";
import {
  type ListFoldersRequestParams,
  type ListFoldersResponse,
} from "./folder.service.types";

class FolderService extends Service {
  public async listFolders(
    params: ListFoldersRequestParams
  ): Promise<Either<Error, ListFoldersResponse>> {
    try {
      const result = await this.api
        .get<ListFoldersResponse>("/folders", {
          params: {
            name: params.name || undefined,
            parent_folder_id: params.parent_folder_id || undefined,
          },
        })
        .then(({ data }) => data);

      return success(result);
    } catch (error) {
      return failure(this.handleError(error));
    }
  }
}

export const folderService = new FolderService();
