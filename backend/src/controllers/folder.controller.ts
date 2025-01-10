import { Request, Response } from "express";
import { StatusCode } from "@/constants";
import { ErrorService } from "@/services/error.service";
import { PandaVideoService } from "@/services/panda-video.service";
import { PandaVideoAPI } from "@/services/panda-video/panda-video.api";
import { FolderValidator } from "@/validators/folder.validator";
import { App } from "@/app";
import { ListFoldersCommand } from "@/use-cases/list-folders.command";

export class FolderController {
  private readonly pandaVideoService: PandaVideoService;
  private readonly folderValidator: FolderValidator;

  constructor(private readonly app: App) {
    this.pandaVideoService = new PandaVideoService(new PandaVideoAPI());
    this.folderValidator = new FolderValidator();
  }

  public async listFolders(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { query } = req;

      const data = this.folderValidator.validateListFolders(query);
      const { name, parent_folder_id } = data;

      const listFoldersCommand = new ListFoldersCommand(this.pandaVideoService);

      const result = await listFoldersCommand.execute({
        name,
        parent_folder_id,
      });

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }
}
