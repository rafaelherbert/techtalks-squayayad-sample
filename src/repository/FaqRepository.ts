import { IRepository } from "../interfaces/base/IRepository";
import IFaq from "../interfaces/lists/IFaq";

export class FaqRepository implements IRepository<IFaq> {
  public listUrl = "Faq";

  public getUpdateObject(item: IFaq): any {
    throw new Error("Method not implemented.");
  }

  public mapObject(item: any, includeBaseFields: boolean): IFaq {
    return this.objectSet(item);
  }

  public getAddObject(item: IFaq): any {
    throw new Error("Method not implemented.");
  }

  public mapObjects(items: any[], includeBaseFields: boolean): IFaq[] {
    return items.map((v, i) => this.objectSet(v)) as IFaq[];
  }

  private objectSet(v: any): IFaq {
    return {
        id: v.ID,
        title: v.Title,
        Answer: v.Answer
    } as IFaq;
  }
}