import { Text } from "@microsoft/sp-core-library";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";

import {
  sp,
  IItems,
  SPBatch,
  IItemAddResult,
  IItemUpdateResult,
  IFolderAddResult,
  IItem,
  IListInfo,
  Web,
  IList,
  IWeb,
} from "@pnp/sp/presets/all";

import { IListService } from "../../interfaces/base/IListService";
import { IRepository } from "../../interfaces/base/IRepository";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import * as _ from "lodash";

export class ListService<T> implements IListService<T> {
  private _spHttpClient: SPHttpClient;
  private _pageContext: PageContext;
  private _currentWebUrl: string;
  private _currentWebRelativeUrl: string;
  private _repository: IRepository<T>;
  private _listName: string;
  private _web: any;

  constructor(context: WebPartContext | ApplicationCustomizerContext, repository: IRepository<T>, fromRoot: boolean = false) {
    this._spHttpClient = context.spHttpClient;
    this._pageContext = context.pageContext;
    this._currentWebUrl = fromRoot ? context.pageContext.site.absoluteUrl : context.pageContext.web.absoluteUrl;
    this._currentWebRelativeUrl = fromRoot ? context.pageContext.site.serverRelativeUrl : context.pageContext.web.serverRelativeUrl;
    this._repository = repository;
    this._listName = repository.listUrl;
    this._web = fromRoot ? Web(context.pageContext.site.absoluteUrl) : sp.web;
  }

  public cloneServiceFromWeb(projectRelativeUrl: string): ListService<T>{
    const auxWeb = this._web;
    const auxCurrentWebRelativeUrl = this._currentWebRelativeUrl;
    const auxCurrentWebUrl = this._currentWebUrl;

    this._currentWebUrl = location.protocol + '//' + location.hostname + projectRelativeUrl;
    this._web = Web(this._currentWebUrl);
    this._currentWebRelativeUrl = projectRelativeUrl;
    
    const svcClone = _.cloneDeep(this);

    this._currentWebUrl = auxCurrentWebUrl;
    this._web = auxWeb;
    this._currentWebRelativeUrl = auxCurrentWebRelativeUrl;

    return svcClone;
  }

  public getList(library: boolean = false): Promise<IList> {
    return this._web
      .getList(
        Text.format(
          "{0}/{1}/{2}",
          this._currentWebRelativeUrl,
          !library ? "/Lists" : "",
          this._listName
        )
      );
  }

  public getListInfo(library: boolean = false): Promise<IListInfo> {
    return this._web
      .getList(
        Text.format(
          "{0}/{1}/{2}",
          this._currentWebRelativeUrl,
          !library ? "/Lists" : "",
          this._listName
        )
      )
      .get();
    //.select("Id,ItemCount")();
  }

  public getQuery(library: boolean = false): IItems {
    return this._web.getList(
      Text.format(
        "{0}/{1}/{2}",
        this._currentWebRelativeUrl,
        !library ? "/Lists" : "",
        this._listName
      )
    ).items;
  }

  public async getQueryAsync(library: boolean = false): Promise<IItems> {
    return await this._web.getList(
      Text.format(
        "{0}/{1}/{2}",
        this._currentWebRelativeUrl,
        !library ? "/Lists" : "",
        this._listName
      )
    ).items;
  }

  public async getQueryAsyncTeste(library: boolean = false): Promise<any> {
    return await this._web
      .getList(
        Text.format(
          "{0}/{1}/{2}",
          this._currentWebRelativeUrl,
          !library ? "/Lists" : "",
          this._listName
        )
      )
      .items.getPaged();
  }

  public async getQueryAsyncItem(
    id: number,
    library: boolean = false
  ): Promise<IItem> {
    return await this._web
      .getList(
        Text.format(
          "{0}/{1}/{2}",
          this._currentWebRelativeUrl,
          !library ? "/Lists" : "",
          this._listName
        )
      )
      .items.getById(id);
  }

  public getQueryOptions(library: boolean = false, listName?: any): IItems {
    return this._web.getList(
      Text.format(
        "{0}/{1}/{2}",
        this._currentWebRelativeUrl,
        !library ? "/Lists" : "",
        listName
      )
    ).items;
  }

  public getItems(
    promise: IItems,
    includeBaseFields: boolean = false
  ): Promise<T[]> {
    return promise().then((items: any[]) => {
      return this._repository.mapObjects(items, includeBaseFields);
    });
  }

  public getAllItems(
    promise: IItems,
    includeBaseFields: boolean = false,
    requestSize: number = 2000
  ): Promise<T[]> {
    return promise.getAll(requestSize).then((items: any[]) => {
      return this._repository.mapObjects(items, includeBaseFields);
    });
  }

  public getById(
    promise: IItem,
    includeBaseFields: boolean = false
  ): Promise<T> {
    return promise.get().then((item: any) => {
      return this._repository.mapObject(item, includeBaseFields);
    });
  }

  public addItem(item: T): Promise<IItemAddResult> {
    let objToAdd = this._repository.getAddObject(item);

    let listUrl = Text.format(
      "{0}/Lists/{1}",
      this._currentWebRelativeUrl,
      this._listName
    );

    return this._web.getList(listUrl).items.add(objToAdd);
  }

  public updateItem(item: T, id: number): Promise<IItemUpdateResult> {
    let obj = this._repository.getUpdateObject(item);

    let listUrl = Text.format(
      "{0}/Lists/{1}",
      this._currentWebRelativeUrl,
      this._listName
    );

    return this._web.getList(listUrl).items.getById(id).update(obj);
  }

  public addFolder(folderName: string): Promise<IFolderAddResult> {
    return this._web.folders.add(
      Text.format("{0}/{1}", this._listName, folderName)
    );
  }

  public deleteItem(id: number): Promise<void> {

    let listUrl = Text.format(
        "{0}/Lists/{1}",
        this._currentWebRelativeUrl,
        this._listName
    );

    return this._web.getList(listUrl).items.getById(id).delete();
  }
}
