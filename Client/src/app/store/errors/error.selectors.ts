import { ErrorState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/store';

const errorsFeatureSelector = createFeatureSelector<ErrorState>(ReducerNodesEnum.appErrors);

export const errorsSelector = createSelector(errorsFeatureSelector, (state: ErrorState) => state.errors);