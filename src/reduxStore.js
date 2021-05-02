import { applyMiddleware, createStore } from "redux";
import moment from 'moment';
import _ from 'lodash';
import logger from "redux-logger";
import { getLocalStorageState, setLocalStorageState } from './localStorageHelper'
import { STORE_INITIAL_DATA, DATE_FORMAT } from './constants';
window._ = _;
window.moment = moment;

// Action type constants
let DUE_DATE_TOGGLE = false;
let PRIORITY_TOGGLE = false;
let SUMMARY_SORT_TOGGLE = false;
const ADD_TODO_LIST = 'ADD_TODO_LIST';
const UPDATE_TODO_LIST = 'UPDATE_TODO_LIST';
const DELETE = 'DELETE';
const DONE = 'DONE';
const DUE_DATE_SORT_BY = 'DUE_DATE_SORT_BY';
const PRIORITY_WISE_SORT = 'PRIORITY_WISE_SORT';
const SUMMARY_SORT = 'SUMMARY_SORT';
const SEARCH_KEY = 'SEARCH_KEY';
const SET_GROUP_BY = 'SET_GROUP_BY';
const CHANGE_USER_NAME = 'CHANGE_USER_NAME';


// all Actions are here
export function addNewTaskAction(payload) {
    return {
        type: ADD_TODO_LIST,
        payload: {
            id: _.uniqueId(),
            done: false,
            createdOn: moment(new Date()).format(DATE_FORMAT),
            ...payload,
        }
    }
}

export function updateTodoListAction(payload) {
    return {
        type: UPDATE_TODO_LIST,
        payload,
    }
}

export function searchKeyAction(payload) {
    return {
        type: SEARCH_KEY,
        payload,
    }
}

export function deletTodoListAction(payload) {
    return ({
        type: DELETE,
        payload,
    })
}

export function doneTodoListAction(payload) {
    return {
        type: DONE,
        payload
    }
}

export function updateUserAction(payload) {
    return {
        type: CHANGE_USER_NAME,
        payload
    }
}

export function dueDateSprtByAction() {
    return {
        type: DUE_DATE_SORT_BY,
    }
}

export function priorityWiseSortAction() {
    return {
        type: PRIORITY_WISE_SORT,
    }
}

export function summaryWiseSortAction() {
    return {
        type: SUMMARY_SORT
    }
}


export function addGroupByAction(payload) {
    return {
        type: SET_GROUP_BY,
        payload
    }
}

// Reducers and helper functions

function toggleDoneFlag(todolist, id) {
    const copyData = JSON.parse(JSON.stringify(todolist));
    copyData.forEach(list => {
        if (list.id === id) {
            list.done = !list.done;
        }
    });
    return copyData;
}

function sortBySummary(todolist) {
    const copyData = JSON.parse(JSON.stringify(todolist));
    let sortedData = _.sortBy(copyData, list => list.summary.toLowerCase());
    if (SUMMARY_SORT_TOGGLE) {
        sortedData = _.reverse(sortedData)
    }
    SUMMARY_SORT_TOGGLE = !SUMMARY_SORT_TOGGLE;
    return sortedData;
}

function sortByPriorityWise(todolist) {
    const copyData = JSON.parse(JSON.stringify(todolist));
    let sortedData = _.sortBy(copyData, list => list.numberPriority);
    if (PRIORITY_TOGGLE) {
        sortedData = _.reverse(sortedData)
    }
    PRIORITY_TOGGLE = !PRIORITY_TOGGLE;
    return sortedData;
}

function sortTaskByDate(todolist) {
    const todayDate = moment(new Date());
    const copyData = JSON.parse(JSON.stringify(todolist));
    copyData.forEach((list) => {
        const dateSplitted = list.dueDate.split('/');
        const diff = todayDate.diff([dateSplitted[2], dateSplitted[1], dateSplitted[0]]);
        list.diff = diff;
    });
    let sortedData = _.sortBy(copyData, list => list.diff);
    if (DUE_DATE_TOGGLE) {
        sortedData = _.reverse(sortedData)
    }
    DUE_DATE_TOGGLE = !DUE_DATE_TOGGLE;
    return sortedData;
}

function updateTodoList(todolist, payload) {
    const copyData = JSON.parse(JSON.stringify(todolist));
    copyData.forEach((list) => {
        if (list.id === payload.id) {
            const keys = Object.keys(payload);
            keys.forEach(key => {
                list[key] = payload[key];
            })
        }
    });
    return copyData;
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ADD_TODO_LIST:
            return {
                ...state,
                todoList: [...state.todoList, payload],
            }
        case UPDATE_TODO_LIST:
            return {
                ...state,
                todoList: updateTodoList(state.todoList, payload)
            }
        case DELETE:
            return {
                ...state,
                todoList: state.todoList.filter(list => list.id !== payload),
            }
        case DONE:
            return {
                ...state,
                todoList: toggleDoneFlag(state.todoList, payload),
            }
        case DUE_DATE_SORT_BY:
            return {
                ...state,
                todoList: sortTaskByDate(state.todoList)
            }
        case PRIORITY_WISE_SORT:
            return {
                ...state,
                todoList: sortByPriorityWise(state.todoList)
            }
        case SUMMARY_SORT:
            return {
                ...state,
                todoList: sortBySummary(state.todoList)
            }
        case SEARCH_KEY:
            return {
                ...state,
                searchKey: payload,
            }
        case SET_GROUP_BY:
            return {
                ...state,
                groupBy: payload,
            }
        case CHANGE_USER_NAME:
            return {
                ...state,
                userName: payload,
            }
        default:
            return state;
    }
}

const getInitalData = getLocalStorageState(STORE_INITIAL_DATA);

function onStoreUpdate() {
    setLocalStorageState(store.getState())
}

const store = createStore(reducer, getInitalData, applyMiddleware(logger));

store.subscribe(_.throttle(onStoreUpdate, 1000))

export default store;