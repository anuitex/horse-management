import { BaseResponseModel } from "../../../../core/models";

export interface ResponseStartMonitoringHorseModel extends BaseResponseModel {
  items: ResponseStartMonitoringHorseModelItem[]
}

export interface ResponseStartMonitoringHorseModelItem {
  id: string;
  heartRate: number;
}
