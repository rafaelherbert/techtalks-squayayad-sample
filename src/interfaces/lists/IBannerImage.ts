import { ICrudListItem } from "../../business/base/BaseCrudBusiness";
import ISharepointListImage from "../base/ISharepointListImage";

export default interface IBannerImage extends ICrudListItem {
    Image: ISharepointListImage;
    Description: string;
}