import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { addNewTaskAction, updateTodoListAction, clearEditTaskID } from '../reduxStore'

const priorityMapper = {
  0: 'None',
  1: 'Low',
  2: 'Medium',
  3: 'High',
}

function AddNewList(props) {
  const editTaskId = useSelector(state => state.editTaskId)
  const dispatch = useDispatch();
  const [summary, setSummary] = useState();
  const [discription, setDiscription] = useState();
  const [dueDate, setDueDate] = useState();
  const [priority, setPriority] = useState('0');

  const onSummaryChange = ({ target: { value } }) => {
    setSummary(value);
  }

  const onDiscriptionChange = ({ target: { value } }) => {
    setDiscription(value);
  }

  const onDueDateChange = ({ target: { value } }) => {
    const customDate = moment(value).format('DD/MM/YYYY')
    setDueDate(customDate);
  }

  const onPriorityChange = ({ target: { value } }) => {
    setPriority(value);
  }

  const onSaveClick = () => {
    if (!summary && !discription && !dueDate && !priority) { // if data is empty then dont dispatch payload.
      return;
    }
    const payload = {
      summary,
      discription,
      dueDate: dueDate || moment(new Date()).format('DD/MM/YYYY'),
      priority: priorityMapper[priority || '0'],
      numberPriority: priority || 0
    }
    if (!!editTaskId) { // If in edit component then dispatch update data only
      payload.id = editTaskId;
      dispatch(updateTodoListAction(payload));
    } else { // pass payload data
      dispatch(addNewTaskAction(payload));
    }
    dispatch(clearEditTaskID());
    props.onHide();
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Summary</Form.Label>
            <Form.Control type="text" onChange={onSummaryChange} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Discription</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={onDiscriptionChange} />
          </Form.Group>
          <Form.Group className="row">
            <div className="col">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" defaultValue="currentDate" onChange={onDueDateChange} />
            </div>
            <div className="col">
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" onChange={onPriorityChange}>
                <option value="0">None</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </Form.Control>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={onSaveClick}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddNewList;