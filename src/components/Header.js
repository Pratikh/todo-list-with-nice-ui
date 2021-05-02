import { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl
} from "react-bootstrap";
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../reduxStore'
import AddNewList from './AddNewList';

function NameChange() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userName = useSelector(state => state.userName);
  const [name, setName] = useState(userName)

  function onInputChange({ currentTarget: { value } }) {
    setName(value)
  }

  function onSaveClick(event) {
    event && event.preventDefault();
    !_.isEmpty(name) && dispatch(updateUserAction(name));
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit user
          </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSaveClick}>

            <InputGroup className="mb-3" value={name}>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={name}
                onChange={onInputChange}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
                  </Button>
          <Button variant="primary" onClick={onSaveClick}>
            Save Changes
                  </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Header() {
  const [modalShow, setModalShow] = useState(false);
  const userName = useSelector(store => store.userName);
  return (
    <div className="headerContainer d-flex">
      <h1> Todo list of {userName}</h1> <NameChange />
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        className="ml-1"
      >
        +
        </Button>
      <AddNewList
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default Header;