/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";
import { Validator } from ".";

const validateListVideosSchema = z.object({
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
  status: z.string().optional(),
  title: z.string().optional(),
});

export class VideoValidator extends Validator {
  public validateListVideos(
    data: any,
  ): z.infer<typeof validateListVideosSchema> {
    try {
      return validateListVideosSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
