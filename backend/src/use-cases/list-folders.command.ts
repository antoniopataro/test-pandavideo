import { FolderEntity } from "@/entities/folder.entity";
import { PandaVideoService } from "@/services/panda-video.service";
import { PandaVideoListFoldersResponse } from "@/services/panda-video/panda-video.service.types";
import { logger } from "@/utils/logger";

type Params = {
  name?: string;
  parent_folder_id?: string;
};

type Result = {
  folders: FolderEntity[];
};

export class ListFoldersCommand {
  constructor(private readonly pandaVideoService: PandaVideoService) {}

  public async execute(params: Params): Promise<Result> {
    try {
      logger.info("ListFoldersCommand initiated");

      const listFoldersFromPandaVideoResponse =
        await this.listFoldersFromPandaVideo(params);

      logger.info("ListFoldersCommand finished");

      return {
        folders: listFoldersFromPandaVideoResponse.folders,
      };
    } catch (error) {
      logger.info("ListFoldersCommand failed");

      throw error;
    }
  }

  private async listFoldersFromPandaVideo(
    params: Params,
  ): Promise<PandaVideoListFoldersResponse> {
    return await this.pandaVideoService.listFolders(params);
  }
}
