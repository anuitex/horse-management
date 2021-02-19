import { BaseResponseModel } from '../../../../core/models/base-response.model';
import { HorseModel } from '../horse.model';

export interface ResponseSearchHorsesModel extends BaseResponseModel {
  items: HorseModel[];
  total: number;
  isDataEmpty: boolean;
}