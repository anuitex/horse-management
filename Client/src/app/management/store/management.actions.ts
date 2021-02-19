import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/core/models';

import {
  RequestCreateHorseModel, RequestUpdateHorsesModel,
  RequestSearchHorseModel, RequestStartMonitoringHorseModel, ResponseSearchHorsesModel
} from './../../core/models/management';


//SEARCH_HORSE
const SEARCH_HORSE: string = '[MANAGEMENT] search horse';
export const searchHorseAction = createAction(SEARCH_HORSE, props<{ req: RequestSearchHorseModel }>());

const SEARCH_HORSE_SUCCESS: string = '[MANAGEMENT] search horse success';
export const searchHorseSuccessAction = createAction(SEARCH_HORSE_SUCCESS, props<{ res: ResponseSearchHorsesModel }>());

//CREATE_HORSE
const CREATE_HORSE: string = '[MANAGEMENT] create horse';
export const createHorseAction = createAction(CREATE_HORSE, props<RequestCreateHorseModel>());

const CREATE_HORSE_SUCCESS: string = '[MANAGEMENT] create horse success';
export const createHorseSuccessAction = createAction(CREATE_HORSE_SUCCESS, props<{ res: BaseResponseModel }>());

//EDIT_HORSE
const EDIT_HORSE: string = '[MANAGEMENT] edit horse';
export const editHorseAction = createAction(EDIT_HORSE, props<RequestUpdateHorsesModel>());

const EDIT_HORSE_SUCCESS: string = '[MANAGEMENT] edit horse success';
export const editHorseSuccessAction = createAction(EDIT_HORSE_SUCCESS, props<{ res: BaseResponseModel }>());

//DELETE_HORSE
const DELETE_HORSE: string = '[MANAGEMENT] delete horse';
export const deleteHorseAction = createAction(DELETE_HORSE, props<{ horseId: string }>());

const DELETE_HORSE_SUCCESS: string = '[MANAGEMENT] delete horse success';
export const deleteHorseSuccessAction = createAction(DELETE_HORSE_SUCCESS, props<{ res: BaseResponseModel }>());

//STATE_HEART
const HEART_HORSE: string = '[MANAGEMENT] state heart connect';
export const heartRateConnectAction = createAction(HEART_HORSE, props<{ horseId: string }>());

const HEART_HORSE_SUCCESS: string = '[MANAGEMENT] delete horse success';
export const heartRateConnectSuccessAction = createAction(HEART_HORSE_SUCCESS, props<{ res: BaseResponseModel }>());

//STATE_initial
const MANAGEMENT_INITIAL: string = '[MANAGEMENT] delete horse initial';
export const initialState = createAction(MANAGEMENT_INITIAL);

//CONNECT
const MANAGEMENT_CONNECT: string = '[MANAGEMENT] Connect';
export const connectAction = createAction(MANAGEMENT_CONNECT);

//CONNECT
const MANAGEMENT_CONNECT_SUCCESS: string = '[MANAGEMENT] Connect success';
export const connectSuccessAction = createAction(MANAGEMENT_CONNECT_SUCCESS, props<RequestStartMonitoringHorseModel>());

//CONNECT
const MANAGEMENT_HEART_STATE: string = '[MANAGEMENT] heart set';
export const heartStateAction = createAction(MANAGEMENT_HEART_STATE, props<any>());
