import { ManagementState } from './../management/store/index';
import { ErrorState } from './errors';

export enum ReducerNodesEnum {
  management = 'management',
  appErrors = 'appErrors'
}

export interface AppState {
  management: ManagementState;
  appErrors: ErrorState;
}




