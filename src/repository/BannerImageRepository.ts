import { IRepository } from "../interfaces/base/IRepository";
import IBannerImage from "../interfaces/lists/IBannerImage";

export class BannerImageRepository implements IRepository<IBannerImage> {
  public listUrl = "BannerImages";

  public getUpdateObject(item: IBannerImage): any {
    throw new Error("Method not implemented.");
  }

  public mapObject(item: any, includeBaseFields: boolean): IBannerImage {
    return this.objectSet(item);
  }

  public getAddObject(item: IBannerImage): any {
    throw new Error("Method not implemented.");
  }

  public mapObjects(items: any[], includeBaseFields: boolean): IBannerImage[] {
    return items.map((v, i) => this.objectSet(v)) as IBannerImage[];
  }

  private objectSet(v: any): IBannerImage {
    return {
        id: v.ID,
        title: v.Title,
        Image: JSON.parse(v.Image),
        Description: v.Description
    } as IBannerImage;
  }
}