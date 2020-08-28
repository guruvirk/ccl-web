import { Page } from './page.model';

export interface IPager<TModel> {
  page: Page<TModel>;
  showPage(pageNo: number);
}
