import { WebPartContext } from "@microsoft/sp-webpart-base";
import { BannerImageRepository } from "../repository/BannerImageRepository";
import IBannerImage from "../interfaces/lists/IBannerImage";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { BaseCrudBusiness } from "./base/BaseCrudBusiness";

export class BannerImageBusiness extends BaseCrudBusiness<IBannerImage>{
    constructor(context: WebPartContext | ApplicationCustomizerContext) {
        super(context, new BannerImageRepository());
    }
}