import { useState } from 'react';
import {
  Button,
} from "react-bootstrap";

import AddNewList from './AddNewList';

const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="headerContainer d-flex">
      <h1> Todo list app</h1>
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