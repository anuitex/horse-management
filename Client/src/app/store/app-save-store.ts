import { Action, ActionReducer } from '@ngrx/store/src/models';
import { merge, pick } from 'lodash';
import { ReducerNodesEnum } from '.';

export const storageStoreKey: string = "store"

const stateKeysForSave: ReducerNodesEnum[] = [ReducerNodesEnum.management];

function setSavedState(state: any, localStorageKey: string) {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string): any {
    return JSON.parse(localStorage.getItem(localStorageKey));
}

export function saveStorMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
    let onInit = true;
    return function (state: S, action: A): S {
        const nextState = reducer(state, action);
        if (onInit) {
            onInit = false;
            const savedState = getSavedState(storageStoreKey);
            return merge(nextState, savedState);
        }
        const stateToSave = pick(nextState, stateKeysForSave);
        setSavedState(stateToSave, storageStoreKey);
        return nextState;
    }
}

