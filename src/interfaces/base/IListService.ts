import { IItems, IItem, IListInfo } from "@pnp/sp/presets/all";

export interface IListService<T> {

  getListInfo(library: boolean):Promise<IListInfo>;

  getQuery(library: boolean): IItems;
  
  getQueryAsync(library: boolean): Promise<IItems>;

  getQueryOptions(library: boolean, listName?: any): IItems;

  getItems(promise: IItems, includeBaseFields?: boolean): Promise<Array<T>>;

  getAllItems(promise: IItems, includeBaseFields?: boolean): Promise<Array<T>>;

  getById(promise: IItem, includeBaseFields: boolean): Promise<T>;

  addItem(item: T): void;
}
