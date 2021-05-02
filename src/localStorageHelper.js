export function getLocalStorageState(initialState) {
    try {
        const serializedState = window.localStorage.getItem('todoAppState');
        if (!serializedState) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
    }
}

export function setLocalStorageState(state) {
    try {
        const serializedState = JSON.stringify(state);
        window.localStorage.setItem('todoAppState', serializedState);
    } catch (error) {
        console.log(error);
    }
}