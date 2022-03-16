export interface IRepository<T> {
    listUrl: string;
    mapObjects(items: any[], includeBaseFields: boolean): T[];
    mapObject(item: any, includeBaseFields: boolean): T;
    getAddObject(item: T): any;
    getUpdateObject(item: T): any;
  }
  