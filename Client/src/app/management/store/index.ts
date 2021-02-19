import { BaseResponseModel } from 'src/app/core/models';
import { ResponseStartMonitoringHorseModelItem } from 'src/app/core/models/management';
import { ResponseSearchHorsesModel } from './../../core/models/management/response/response-search-horses.model';

export interface ManagementState {
  data: ResponseSearchHorsesModel;
  createHorse?: BaseResponseModel;
  editHorse?: BaseResponseModel;
  deleteHorse?: BaseResponseModel;
  heartsRate?: {
    [key: string]: {
      heart: number[];
      warning: boolean;
    };
  };
}
