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

export class BaseCrudBusiness<T extends ICrudListItem> {
    public context: WebPartContext | ApplicationCustomizerContext;
    private listService: ListService<T>;
    public listId: string;

    constructor(
        context: WebPartContext | ApplicationCustomizerContext,
        listId: string,
        repository: IRepository<T>,
    ) {
        this.context = context;
        this.listId = listId;
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