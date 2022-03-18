import { WebPartContext } from "@microsoft/sp-webpart-base";
import { FaqRepository } from "../repository/FaqRepository";
import IFaq from "../interfaces/lists/IFaq";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { BaseCrudBusiness } from "./base/BaseCrudBusiness";

export class FaqBusiness extends BaseCrudBusiness<IFaq>{
    constructor(context: WebPartContext | ApplicationCustomizerContext) {
        super(
            context,
            "6e6413a3-01c9-406d-9ed3-35097d8817eb",
            new FaqRepository()
        );
    }
}