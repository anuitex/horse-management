import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpointsConstants } from 'src/app/shared/constants';
import { ApiEndpointHelper } from 'src/app/shared/helpers/api-endpoint.helper';
import { BaseResponseModel } from '../models/base-response.model';
import {
  RequestSearchHorseModel,
  ResponseSearchHorsesModel,
  RequestCreateHorseModel,
  RequestUpdateHorsesModel
} from '../models/management';

@Injectable({
  providedIn: 'root'
})


export class ManagementService {

  constructor(private httpClient: HttpClient) { }

  search(model: RequestSearchHorseModel): Observable<ResponseSearchHorsesModel> {
    return this.httpClient.get<any>(`${ApiEndpointHelper.get(ApiEndpointsConstants.MANAGEMENT_SEARCH)}?page=${model.page}&limit=${model.pageSize}&search=`);
  }

  delete(id: string): Observable<BaseResponseModel> {
    return this.httpClient.delete<BaseResponseModel>(`${ApiEndpointHelper.get(ApiEndpointsConstants.MANAGEMENT_DELETE)}?id=${id}`);
  }

  create(model: RequestCreateHorseModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(ApiEndpointHelper.get(ApiEndpointsConstants.MANAGEMENT_CREATE), model);
  }

  edit(model: RequestUpdateHorsesModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(ApiEndpointHelper.get(ApiEndpointsConstants.MANAGEMENT_EDIT), model);
  }
}
