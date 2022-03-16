import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { ISiteGroupInfo } from "@pnp/sp/site-groups";

export interface ICurrentUser {
  siteUserInfo: ISiteUserInfo;
  siteGroupInfo: ISiteGroupInfo[];
  isManager?: boolean;
  isImmediateManager?: boolean;
  isTrainOffice?: boolean;
  isUser?: boolean;
}
