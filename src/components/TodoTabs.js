import {
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import TodoListRow from './TodoListRow'
import {
  dueDateSprtByAction, priorityWiseSortAction, summaryWiseSortAction
} from '../reduxStore'
import AddNewList from './AddNewList';

const TodoRows = () => {
  const dispatch = useDispatch();
  const dueDateSortByClick = () => {
    dispatch(dueDateSprtByAction());
  }

  const priorityWiseSortList = () => {
    dispatch(priorityWiseSortAction());
  }

  const summaryWiseSortList = () => {
    dispatch(summaryWiseSortAction());
  }

  return ( // All header row data ex : summery, Priority etc.
    <div className="Headings row">
      <div className="col head">
        <span>Summary</span>
        <Button className="SummaryBt" onClick={summaryWiseSortList}>^</Button>
      </div>
      <div className="col head">
        <span>Priority</span>
        <Button className="priorityBT" onClick={priorityWiseSortList}>^</Button>
      </div>
      <div className="col head">
        <span>Created On</span>
      </div>
      <div className="col head">
        <span>Due By</span>
        <Button className="DueBT" onClick={dueDateSortByClick}>^</Button>
      </div>
      <div className="col head">
        <span>User name</span>
      </div>
      <div className="col head">
        <span>Actions</span>
      </div>
    </div>
  )
}


const TodoTabs = () => {
  const [modalShow, setModalShow] = useState(false);
  const todoList = useSelector(store => store.todoList);
  const searchKey = useSelector(store => store.searchKey).toLowerCase();
  const completed = () => {
    return todoList.filter(list => !list.done)
  }

  const filteredSearchList = () => { // based on search string filter out data and pass to row component to show.
    return todoList.filter(list => {
      return list.summary.toLowerCase().includes(searchKey);
    })
  }

  const filteredData = filteredSearchList();

  const pending = () => {
    return todoList.filter(list => list.done)
  }

  return (
    <div className="Todos-tab">
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="All">
          <div>
            <TodoRows />
            <TodoListRow todoList={filteredData} onclickmodelshow={() => setModalShow(true)} />
          </div>
        </Tab>
        <Tab eventKey="pending" title="Pending">
          <div>
            <TodoRows />
            <TodoListRow todoList={completed()} onclickmodelshow={() => setModalShow(true)} />
          </div>
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <div>
            <TodoRows />
            <TodoListRow todoList={pending()} onclickmodelshow={() => setModalShow(true)} />
          </div>
        </Tab>
      </Tabs>
      <AddNewList
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default TodoTabs;