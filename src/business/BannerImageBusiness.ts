import { WebPartContext } from "@microsoft/sp-webpart-base";
import { BannerImageRepository } from "../repository/BannerImageRepository";
import IBannerImage from "../interfaces/lists/IBannerImage";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { BaseCrudBusiness } from "./base/BaseCrudBusiness";

export class BannerImageBusiness extends BaseCrudBusiness<IBannerImage>{
    constructor(context: WebPartContext | ApplicationCustomizerContext) {
        super(
            context,
            "a6d0aca8-6768-4b21-9561-1e61c5a7ed7e",
            new BannerImageRepository()
        );
    }
}