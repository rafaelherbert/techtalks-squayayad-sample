import { Guid } from "@microsoft/sp-core-library";

export default interface ISharepointListImage {
    type:string;
    fileName: string;
    nativeFile: any;
    fieldName: string;
    serverUrl: string;
    fieldId: Guid;
    serverRelativeUrl:string;
    id: string;
}