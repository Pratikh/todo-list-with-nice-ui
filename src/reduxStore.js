import { applyMiddleware, createStore } from "redux";
import { v4 } from "uuid";
import moment from 'moment';
import _ from 'lodash';
import logger from "redux-logger";
import { getLocalStorageState, setLocalStorageState } from './localStorageHelper'
window._ = _;
window.moment = moment;


// Store initial state, just dummy data to show.
const initialStore = {
    userName: 'Guru',
    todoList: [
        {
            id: v4(),
            summary: ' Go to gym ',
            discription: 'Make 100 push up',
            dueDate: '16/04/2021',
            priority: 'High',
            done: false,
            numberPriority: 3,
            createdOn: moment(new Date()).format('DD/MM/YYYY'),
            userName: 'Guru',
        },
        {
            id: v4(),
            summary: ' Market ',
            discription: 'Bring 10KG tomato',
            dueDate: '17/04/2021',
            priority: 'Medium',
            done: false,
            numberPriority: 2,
            createdOn: moment(new Date()).format('DD/MM/YYYY'),
            userName: 'Guru',
        },
        {
            id: v4(),
            summary: ' Home work ',
            discription: 'Write essay on school',
            dueDate: '18/04/2021',
            priority: 'Low',
            done: false,
            numberPriority: 1,
            userName: 'Guru',
            createdOn: moment(new Date()).format('DD/MM/YYYY')
        },
        {
            id: v4(),
            summary: ' Swimming ',
            discription: 'Goto swimming classes',
            dueDate: '20/04/2021',
            priority: 'None',
            done: false,
            numberPriority: 0,
            userName: 'Guru',
            createdOn: moment(new Date()).format('DD/MM/YYYY')
        },
    ],
    editTaskId: null,
    searchKey: '',
    groupBy: 0,
}

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
const EDIT_TASK_ID = 'EDIT_TASK_ID';
const CLEAR_EDIT_TASK_ID = 'CLEAR_EDIT_TASK_ID';
const SEARCH_KEY = 'SEARCH_KEY';
const SET_GROUP_BY = 'SET_GROUP_BY';
const CHANGE_USER_NAME = 'CHANGE_USER_NAME';


// all Actions are here
export function addNewTaskAction(payload) {
    return {
        type: ADD_TODO_LIST,
        payload: {
            id: v4(),
            done: false,
            ...payload,
            createdOn: moment(new Date()).format('DD/MM/YYYY')
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
    return ({
        type: CHANGE_USER_NAME,
        payload
    })
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

export function editTaskID(payload) {
    return {
        type: EDIT_TASK_ID,
        payload,
    }
}

export function clearEditTaskID() {
    return {
        type: CLEAR_EDIT_TASK_ID,
    }
}


export function addGroupByAction(payload) {
    return {
        type: SET_GROUP_BY,
        payload
    }
}

// Reducers and helper functions

function toggleDoneFag(todolist, id) {
    const copyArray = [...todolist];
    copyArray.forEach(list => {
        if (list.id === id) {
            list.done = !list.done;
        }
    });
    return copyArray;
}

function sortBySummary(todolist) {
    const copyData = [...todolist];
    let sortedData = _.sortBy(copyData, list => list.summary.toLowerCase());
    if (SUMMARY_SORT_TOGGLE) {
        sortedData = _.reverse(sortedData)
    }
    SUMMARY_SORT_TOGGLE = !SUMMARY_SORT_TOGGLE;
    return sortedData;
}

function sortByPriorityWise(todolist) {
    const copyData = [...todolist];
    let sortedData = _.sortBy(copyData, list => list.numberPriority);
    if (PRIORITY_TOGGLE) {
        sortedData = _.reverse(sortedData)
    }
    PRIORITY_TOGGLE = !PRIORITY_TOGGLE;
    return sortedData;
}

function sortTaskByDate(todolist) {
    const todayDate = moment(new Date());

    const copyData = [...todolist];
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
    const copyData = [...todolist];
    const cleanPayload = JSON.parse(JSON.stringify(payload));
    copyData.forEach((list, index) => {
        if (list.id === cleanPayload.id) {
            const keys = Object.keys(cleanPayload);
            keys.forEach(k => {
                list[k] = cleanPayload[k];
            })
        }
    });
    return copyData;
}

function reducer(state = initialStore, { type, payload }) {
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
                todoList: toggleDoneFag(state.todoList, payload),
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
        case EDIT_TASK_ID:
            return {
                ...state,
                editTaskId: payload
            }
        case CLEAR_EDIT_TASK_ID:
            return {
                ...state,
                editTaskID: null,
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

const getInitalData = getLocalStorageState(initialStore);
const store = createStore(reducer, getInitalData, applyMiddleware(logger));
function onStoreUpdate() {
    console.log('update');
    setLocalStorageState(store.getState())
}
store.subscribe(_.throttle(onStoreUpdate, 1000))

export default store;