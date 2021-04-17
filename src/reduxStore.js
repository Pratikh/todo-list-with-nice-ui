import { createStore } from "redux";
import { v4 } from "uuid";
import moment from 'moment';
import _ from 'lodash';
window._ = _;


// Store initial state, just dummy data to show.
const initialStore = {
    todoList: [
        {
            id: v4(),
            summary: ' Go to gym ',
            discription: ' Make 100 push up',
            dueDate: '16/04/2021',
            priority: 'High',
            done: false,
            numberPriority: 3,
            createdOn: moment(new Date()).format('DD/MM/YYYY')
        },
        {
            id: v4(),
            summary: ' Market ',
            discription: ' Bring 10KG tomato',
            dueDate: '17/04/2021',
            priority: 'Medium',
            done: false,
            numberPriority: 2,
            createdOn: moment(new Date()).format('DD/MM/YYYY')
        },
        {
            id: v4(),
            summary: ' Home work ',
            discription: ' Write essay on school',
            dueDate: '18/04/2021',
            priority: 'Low',
            done: false,
            numberPriority: 1,
            createdOn: moment(new Date()).format('DD/MM/YYYY')
        },
        {
            id: v4(),
            summary: ' Swimming ',
            discription: ' Goto swimming classes',
            dueDate: '20/04/2021',
            priority: 'None',
            done: false,
            numberPriority: 0,
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


// all Actions are here
const addNewTaskAction = (payload) => {
    return ({
        type: ADD_TODO_LIST,
        payload: {
            id: v4(),
            done: false,
            ...payload,
            createdOn: moment(new Date()).format('DD/MM/YYYY')

        }
    })
}

const updateTodoListAction = (payload) => {
    return ({
        type: UPDATE_TODO_LIST,
        payload,
    })
}

const searchKeyAction = (payload) => {
    return ({
        type: SEARCH_KEY,
        payload,
    })
}

const deletTodoListAction = (payload) => {
    return ({
        type: DELETE,
        payload,
    })
}

const doneTodoListAction = (payload) => {
    return ({
        type: DONE,
        payload
    })
}

const dueDateSprtByAction = () => {
    return {
        type: DUE_DATE_SORT_BY,
    }
}

const priorityWiseSortAction = () => {
    return {
        type: PRIORITY_WISE_SORT,
    }
}

const summaryWiseSortAction = () => {
    return {
        type: SUMMARY_SORT
    }
}

const editTaskID = (payload) => {
    return {
        type: EDIT_TASK_ID,
        payload,
    }
}

const clearEditTaskID = () => {
    return {
        type: CLEAR_EDIT_TASK_ID,
    }
}


const addGroupByAction = (payload) => {
    return {
        type: SET_GROUP_BY,
        payload
    }
}
export {
    addNewTaskAction, addGroupByAction, searchKeyAction, editTaskID,
    clearEditTaskID, updateTodoListAction, deletTodoListAction, doneTodoListAction,
    dueDateSprtByAction, priorityWiseSortAction, summaryWiseSortAction
};


// Reducers and helper functions

const toggleDoneFag = (todolist, id) => {
    const copyArray = [...todolist];
    copyArray.forEach(list => {
        if (list.id === id) {
            list.done = !list.done;
        }
    });
    return copyArray;
}

const sortBySummary = (todolist) => {
    const copyData = [...todolist];
    let sortedData = _.sortBy(copyData, list => list.summary.toLowerCase());
    if (SUMMARY_SORT_TOGGLE) {
        sortedData = _.reverse(sortedData)
    }
    SUMMARY_SORT_TOGGLE = !SUMMARY_SORT_TOGGLE;
    return sortedData;
}

const sortByPriorityWise = (todolist) => {
    const copyData = [...todolist];
    let sortedData = _.sortBy(copyData, list => list.numberPriority);
    if (PRIORITY_TOGGLE) {
        sortedData = _.reverse(sortedData)
    }
    PRIORITY_TOGGLE = !PRIORITY_TOGGLE;
    return sortedData;
}

const sortTaskByDate = (todolist) => {
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

const updateTodoList = (todolist, payload) => {
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

const reducer = (state = initialStore, { type, payload }) => {
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
        default:
            return state;
    }
}

export default createStore(reducer, initialStore);