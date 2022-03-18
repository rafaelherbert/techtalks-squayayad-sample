import { ICrudListItem } from "../../business/base/BaseCrudBusiness";

export default interface IFaq extends ICrudListItem  {
    Answer: string;
}