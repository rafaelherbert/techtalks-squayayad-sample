import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListInfo } from "@pnp/sp/lists";
import { ListService } from "../../services/base/ListService";
import { BannerImageRepository } from "../../repository/BannerImageRepository";
import IBannerImage from "../../interfaces/lists/IBannerImage";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { IListItem } from "../../interfaces/base/IListItem";
import { IRepository } from "../../interfaces/base/IRepository";

const selectDefault = ["Id", "Title"];

export interface ICrudListItem extends IListItem {
}

export abstract class BaseCrudBusiness<T extends ICrudListItem> {
    public listInfo: IListInfo;
    public context: WebPartContext | ApplicationCustomizerContext;
    private listService: ListService<T>;

    constructor(context: WebPartContext | ApplicationCustomizerContext, repository: IRepository<T>) {
        this.context = context;
        this.listService = new ListService(context, repository);
    }

    public async getAll(): Promise<T[]> {
        const crudListItemQuery = await this.listService.getQueryAsync();
        const get = crudListItemQuery.select("*");
        return this.listService.getAllItems(get);
    }

    public async deleteById(id: number): Promise<void> {
        return this.listService.deleteItem(id);
    }
}