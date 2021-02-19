import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReducerNodesEnum } from "src/app/store";
import { ManagementState } from ".";

const horseManagementFeatureSelector = createFeatureSelector<ManagementState>(ReducerNodesEnum.management);

export const horseManagementSelector = createSelector(horseManagementFeatureSelector, (state: ManagementState) => state);
export const horseManagementTableSelector = createSelector(horseManagementFeatureSelector, (state: ManagementState) => state.data);
export const horseCreatedSelector = createSelector(horseManagementFeatureSelector, (state: ManagementState) => state.createHorse);
export const horseEditedSelector = createSelector(horseManagementFeatureSelector, (state: ManagementState) => state.editHorse);
export const horseDeletedSelector = createSelector(horseManagementFeatureSelector, (state: ManagementState) => state.deleteHorse);
export const getHeartSelector = createSelector(horseManagementFeatureSelector, (state: ManagementState) => state.heartsRate);
