import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { nextTick } from 'process';
import { ManagementState } from '.';

import * as historyActions from './management.actions';
interface Heart {
  [x: string]: {
    heart: number[];
    warning: boolean;
  }
}
const initialState: ManagementState = {
  data: null,
  heartsRate: {}
};

export const _ManagementReducer: ActionReducer<ManagementState, Action> =
  createReducer(
    initialState,
    on(
      historyActions.searchHorseSuccessAction,
      (state: ManagementState, { res }) => {
        return ({ ...state, data: { ...res } })
      }
    ),
    on(
      historyActions.createHorseSuccessAction,
      (state: ManagementState, { res }) => {
        return ({ ...state, createHorse: { ...res } })
      }
    ),
    on(
      historyActions.editHorseSuccessAction,
      (state: ManagementState, { res }) => {
        return ({ ...state, editHorse: { ...res } })
      }
    ),
    on(
      historyActions.deleteHorseSuccessAction,
      (state: ManagementState, { res }) => {
        return ({ ...state, deleteHorse: { ...res } })
      }
    ),
    on(
      historyActions.heartStateAction,
      (state: ManagementState, items) => {

        let newHeartsRate = JSON.parse(JSON.stringify(state.heartsRate));
        const arrayIds: string[] = Object.keys(items)
        arrayIds.forEach((id: string) => {
          if (id !== "type") {
            debugger
            if (!newHeartsRate.hasOwnProperty(id)) {

              newHeartsRate[id] = {
                heart: [items[id]],
                warning: false
              }
            } else {
              if (newHeartsRate[id].heart.length > 5) {
                newHeartsRate[id].heart.shift();
                newHeartsRate[id].heart.push(items[id]);
              } else {
                newHeartsRate[id].heart.push(items[id]);

              }
            }
            const isWarning: boolean = newHeartsRate[id].heart.filter((item: number) => item > 40).length > 3;
            newHeartsRate[id].warning = isWarning;
          }
        })
        return ({ ...state, heartsRate: { ...newHeartsRate } })
      }
    ),
    on(
      historyActions.initialState,
      (state: ManagementState) => {
        return ({
          ...state,
          createHorse: null,
          editHorse: null,
          deleteHorse: null,
        })
      }
    ),
  );

export function ManagementReducer(state: ManagementState, action: Action) {
  return _ManagementReducer(state, action);
}
