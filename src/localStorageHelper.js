import { LOCAL_STORAGE_KEY_NAME } from './constants';

// get local stored data, if not present return initial state.
export function getLocalStorageState(initialState) {
    // if local storage turned off,then browser will throw error.
    try {
        const serializedState = window.localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
        if (!serializedState) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
    }
}
// update local storage on every state change.
export function setLocalStorageState(state) {
    try {
        const serializedState = JSON.stringify(state);
        window.localStorage.setItem(LOCAL_STORAGE_KEY_NAME, serializedState);
    } catch (error) {
        console.log(error);
    }
}