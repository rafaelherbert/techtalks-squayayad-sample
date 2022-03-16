import { IUser } from "./IUser";

export interface IListItem {
    id?: number;
    title?:string;
    created?: Date | undefined;
    modified?: Date | undefined;
    author?:IUser | null;
    editor?:IUser | null;
    changed?:boolean;
    deleted?:boolean;
}