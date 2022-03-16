import { IListItem } from "../base/IListItem";
import ISharepointListImage from "../base/ISharepointListImage";

export default interface IBannerImage extends IListItem {
    Image: ISharepointListImage;
    Description: string;
}