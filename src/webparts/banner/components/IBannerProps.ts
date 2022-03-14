import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFilePickerResult } from "@pnp/spfx-controls-react";

export interface IBannerProps {
  description: string;
  filePickerResult: IFilePickerResult;
  context: WebPartContext;
}
