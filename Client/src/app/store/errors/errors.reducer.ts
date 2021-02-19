import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ErrorState } from '.';
import * as actions from './error.actions';

const initialState: ErrorState = {
  errors: undefined
};

export const _errorsReducer: ActionReducer<ErrorState, Action> =
  createReducer(
    initialState,
    on(
      actions.errorAction,
      (state: ErrorState, { errors }) => {
        return ({ ...state, errors: [...errors] })
      }
    ),
    on(
      actions.clearErrorAction,
      (state: ErrorState,) =>
        ({ ...state, errors: initialState.errors })
    )
  );

export function ErrorsReducer(state: ErrorState, action: Action) {
  return _errorsReducer(state, action);
}
