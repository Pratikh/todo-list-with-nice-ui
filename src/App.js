import './App.css';
import { Dropdown, Button, InputGroup, FormControl, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <div className='headerContainer'>
        <h1> Todo list app</h1>
        <Button variant="primary"> + </Button>{' '}
      </div>
      <div className='groupBy-Serach-container'>
        <div className='groupbyContainer'>
          <h4> Group by</h4>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Priority
          </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='searchContainer'>
          {/* <h4> Search </h4> */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Search</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Search for task"
            />
          </InputGroup>
        </div>
      </div>
      <div className='taskTabs'>
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Pending</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled">
              Completed
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}

export default App;
