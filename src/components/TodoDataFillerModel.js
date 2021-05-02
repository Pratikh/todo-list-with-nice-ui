import React, { useState } from "react";
import {
    Button,
    Modal,
    Form,
} from "react-bootstrap";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { updateTodoListAction } from '../reduxStore';
import { DATE_FORMAT, PRIORITY_MAPPER } from '../constants';

export default function EditTodoDetails(props) {
    const dispatch = useDispatch();
    const editableTodoData = useSelector(store => store.todoList).find(list => list.id === props.todoId);
    const userName = useSelector(state => state.userName);
    const [summary, setSummary] = useState(editableTodoData.summary);
    const [discription, setDiscription] = useState(editableTodoData.discription);
    const [dueDate, setDueDate] = useState(editableTodoData.dueDate);
    const [priority, setPriority] = useState(editableTodoData.numberPriority);

    function onSummaryChange({ target: { value } }) {
        setSummary(value);
    }

    function onDiscriptionChange({ target: { value } }) {
        setDiscription(value);
    }

    function onDueDateChange({ target: { value } }) {
        const customDate = moment(value).format(DATE_FORMAT)
        setDueDate(customDate);
    }

    function onPriorityChange({ target: { value } }) {
        setPriority(value);
    }

    function onSaveClick(event) {
        event && event.preventDefault();
        const payload = {
            summary,
            discription,
            dueDate: dueDate || moment(new Date()).format(DATE_FORMAT),
            priority: PRIORITY_MAPPER[priority || '0'],
            numberPriority: priority || 0,
            userName,
            id: props.todoId,
        }
        dispatch(updateTodoListAction(payload));
        props.setModalShow(false);
    }
    const splittedDate = dueDate.split('/');
    const defaultDueDateFormat = splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0];
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSaveClick}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control type="text" onChange={onSummaryChange} value={summary} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Discription</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={onDiscriptionChange} value={discription} />
                    </Form.Group>
                    <Form.Group className="row">
                        <div className="col">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" value={defaultDueDateFormat} onChange={onDueDateChange} />
                        </div>
                        <div className="col">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select" onChange={onPriorityChange} value={priority}>
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
                <Button onClick={() => {
                    props.setModalShow(false);
                }}>Close</Button>
                <Button onClick={onSaveClick}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}