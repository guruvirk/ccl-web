import { RemoteData } from './remote-data.model';
import { Page } from 'src/app/models';

export class ServerData<TModel> extends RemoteData {
  public data: TModel | undefined;
  public items: TModel[] | [];
  public page: Page<TModel>;
}
