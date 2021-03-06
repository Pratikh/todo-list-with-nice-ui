import {
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletTodoListAction, doneTodoListAction,
} from '../reduxStore'
import _, { uniqueId } from 'lodash'
import TodoEditModel from './TodoDataFillerModel'
import { useState } from "react";

function style(done) {
  return { textDecoration: done ? 'line-through' : 'auto', }
}

function TodoListRow({ todoList }) {
  const dispatch = useDispatch();

  function onDoneClick(id) {
    dispatch(doneTodoListAction(id));
  }

  function onDeleteClick(id) {
    dispatch(deletTodoListAction(id));
  }

  const groupBy = useSelector(store => store.groupBy);

  function groupByFun() { // get group by data based to todo list details.
    switch (groupBy) {
      case 0:
        return { None: todoList };
      case 1:
        return _.groupBy(todoList, (list) => {
          return list.createdOn;
        })
      case 2:
        return _.groupBy(todoList, (list) => {
          return list.dueDate;
        })
      case 3:
        return _.groupBy(todoList, (list) => {
          return list.priority;
        })
      case 4:
        return _.groupBy(todoList, (list) => {
          return list.userName;
        })
      default:
        return { None: todoList };
    }
  }

  function RowsComponentParent({ data: { id, summary, dueDate, createdOn, priority, done, userName } }) {
    const [modalShow, setModalShow] = useState(false);

    function showEditModel(flag) {
      setModalShow(flag)
    }

    return (
      <div key={id} className="Headings row">
        <div className="col head">
          <span style={style(done)}>{summary}</span>
        </div>
        <div className="col head">
          <span style={style(done)}>{priority}</span>
        </div>

        <div className="col head">
          <span style={style(done)}>{createdOn}</span>
        </div>

        <div className="col head">
          <span style={style(done)}>{dueDate}</span>
        </div>
        <div className="col head">
          <span style={style(done)}>{userName}</span>
        </div>
        <div className="col head">
          <div className="row">
            <Button variant="primary" size="sm" className="editBT col" onClick={showEditModel.bind({}, true)}>
              {'Edit'}
            </Button>
            <Button variant="success" className="doneBT col" onClick={onDoneClick.bind({}, id)}>
              {done ? 'ReOpen' : 'Done'}
            </Button>
            <Button variant="danger" className="deleteBT col" onClick={onDeleteClick.bind({}, id)}>
              Delete
              </Button>
          </div>
        </div>
        <TodoEditModel show={modalShow} todoId={id} setModalShow={showEditModel.bind({}, false)} />
      </div>
    )
  }

  function Header({ groupData }) {
    return groupData.map((data) => {
      return (
        <div key={data.id} className="Headings row">
          < RowsComponentParent data={data} />
        </div>
      )

    })
  }

  function Component() {
    const groupbyData = groupByFun();
    return Object.keys(groupbyData).map((key, i) => {
      return (
        <div key={uniqueId()}>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}><span>{key}</span></div>
          <Header groupData={groupbyData[key]} ></Header>
        </div>
      )
    })
  }

  return (<Component />)
}

export default TodoListRow;