import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IWebPartProps {
  context: WebPartContext;
  siteUrl: string;
}
