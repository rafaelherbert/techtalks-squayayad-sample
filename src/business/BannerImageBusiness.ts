import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListInfo } from "@pnp/sp/lists";
import { ListService } from "../services/base/ListService";
import { BannerImageRepository } from "../repository/BannerImageRepository";
import IBannerImage from "../interfaces/lists/IBannerImage";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

const selectDefault = ["Id", "Title"];

export class BannerImageBusiness {
    
    public listInfo: IListInfo;
    private context: WebPartContext | ApplicationCustomizerContext;
    private svcBannerImages: ListService<IBannerImage>;

    constructor(context: WebPartContext | ApplicationCustomizerContext) {
        this.context = context;
        this.svcBannerImages = new ListService(context, new BannerImageRepository());
    }

    public async getAll(): Promise<IBannerImage[]> {
        const bannerImageQuery = await this.svcBannerImages.getQueryAsync();
        const select = [...selectDefault, "Image"];
        const get = bannerImageQuery
            .select(...select);

        return this.svcBannerImages.getAllItems(get);
    }
}