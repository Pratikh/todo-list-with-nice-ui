import moment from 'moment';
import _ from 'lodash';

export const DATE_FORMAT = 'DD/MM/YYYY';

export const LOCAL_STORAGE_KEY_NAME = 'todoAppState';

export const PRIORITY_MAPPER = {
  0: 'None',
  1: 'Low',
  2: 'Medium',
  3: 'High',
}

export const STORE_INITIAL_DATA = {
  userName: 'Guru',
  todoList: [
    {
      id: _.uniqueId(),
      summary: ' Go to gym ',
      discription: 'Make 100 push up',
      dueDate: '16/04/2021',
      priority: 'High',
      done: false,
      numberPriority: 3,
      createdOn: moment(new Date()).format(DATE_FORMAT),
      userName: 'Guru',
    },
    {
      id: _.uniqueId(),
      summary: ' Market ',
      discription: 'Bring 10KG tomato',
      dueDate: '17/04/2021',
      priority: 'Medium',
      done: false,
      numberPriority: 2,
      createdOn: moment(new Date()).format(DATE_FORMAT),
      userName: 'Guru',
    },
    {
      id: _.uniqueId(),
      summary: ' Home work ',
      discription: 'Write essay on school',
      dueDate: '18/04/2021',
      priority: 'Low',
      done: false,
      numberPriority: 1,
      userName: 'Guru',
      createdOn: moment(new Date()).format(DATE_FORMAT)
    },
    {
      id: _.uniqueId(),
      summary: ' Swimming ',
      discription: 'Goto swimming classes',
      dueDate: '20/04/2021',
      priority: 'None',
      done: false,
      numberPriority: 0,
      userName: 'Guru',
      createdOn: moment(new Date()).format(DATE_FORMAT)
    },
  ],
  searchKey: '',
  groupBy: 0,
}