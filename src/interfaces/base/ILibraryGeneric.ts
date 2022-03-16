import { IListItem } from "../base/IListItem";
import { IFile } from "./IFile";

export interface ILibraryGeneric extends IListItem{
    file?: IFile;
    suggestion?: string;
}