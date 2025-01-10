/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";
import { Validator } from ".";

const validateGetVideoDetailsSchema = z.object({
  id: z
    .string({
      message: "missing id",
    })
    .min(1, "invalid id length"),
});

const validateListVideosSchema = z.object({
  folder_id: z.string().optional(),
  limit: z
    .string({
      message: "missing limit",
    })
    .min(1, "invalid limit length"),
  page: z
    .string({
      message: "missing page",
    })
    .min(1, "invalid page length"),
  root_folder: z.string().optional(),
  status: z.string().optional(),
  title: z.string().optional(),
});

const validateUpdateVideoPropertiesSchema = z.object({
  id: z
    .string({
      message: "missing id",
    })
    .min(1, "invalid id length"),
  properties: z.object({
    description: z.string().optional(),
    folder_id: z.string().optional(),
    title: z.string().optional(),
  }),
});

export class VideoValidator extends Validator {
  public validateGetVideoDetails(
    data: any,
  ): z.infer<typeof validateGetVideoDetailsSchema> {
    try {
      return validateGetVideoDetailsSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public validateListVideos(
    data: any,
  ): z.infer<typeof validateListVideosSchema> {
    try {
      return validateListVideosSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public validateUpdateVideoProperties(
    data: any,
  ): z.infer<typeof validateUpdateVideoPropertiesSchema> {
    try {
      return validateUpdateVideoPropertiesSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
