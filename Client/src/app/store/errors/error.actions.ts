import { createAction, props } from '@ngrx/store';

const ERROR: string = '[APP] Error';
export const errorAction = createAction(ERROR, props<{ errors: any }>());

const CLEAR_ERROR: string = '[APP] Error clear';
export const clearErrorAction = createAction(CLEAR_ERROR);
