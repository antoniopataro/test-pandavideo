/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";
import { Validator } from ".";

const validateListFoldersSchema = z.object({
  name: z.string().optional(),
  parent_folder_id: z.string().optional(),
});

export class FolderValidator extends Validator {
  public validateListFolders(
    data: any,
  ): z.infer<typeof validateListFoldersSchema> {
    try {
      return validateListFoldersSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
