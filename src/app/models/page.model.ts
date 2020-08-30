export class Page<TModel> {
  public items: TModel[];
  public total: number;
  public skip: number;
  public limit: number;
  public pageNo: number;
  public sort: string;
  public totalPages: number;
}
