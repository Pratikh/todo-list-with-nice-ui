import { useState } from "react";
import {
    InputGroup,
    FormControl,
    Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchKeyAction, addGroupByAction } from '../reduxStore'

const GroupAndSearchTool = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const onSearchInputChange = ({ target: { value } }) => {
        setSearch(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(searchKeyAction(search))
    }

    const onGroupByChange = ({ target: { value } }) => {
        dispatch(addGroupByAction(+value)); // need value on number type, not in string type.
    }

    return (
        <div className="row">
            <div className="groupbyContainer col-3">
                <h4>Group by</h4>
                <Form.Control as="select" onChange={onGroupByChange}>
                    <option value='0'>None</option>
                    <option value='1'>Created On</option>
                    <option value='2'>Pending On</option>
                    <option value='3'>Priority</option>
                </Form.Control>
            </div>
            <div className="searchContainer col" >
                <h4>Search</h4>
                <form onSubmit={onSubmit}>
                    <InputGroup className="mb-3"  >
                        <FormControl
                            placeholder="Search for task, hit enter to search. Clear to show all list. (Case sensitive)"
                            onChange={onSearchInputChange}
                        />
                    </InputGroup>
                </form>
            </div>
        </div>
    )
}

export default GroupAndSearchTool;
