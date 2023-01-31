import React from "react";
import {useNavigate} from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup';

function EntryListItem({entry}){

    const navigate = useNavigate()
    const onClick = () =>{
        navigate("/viewEntry", {state:{entry:entry}})
    }

    return (
    <ListGroup.Item action onClick={e=>{onClick()}}
    className="d-flex justify-content-between align-items-start"
    >
        
        {/* Main header for the list item*/}
        <div className="ms-2 list_item_content">
            <h2 className="fw-bold fw-3">{entry.title}</h2>
            <div className="body-preview fw-light fs-4">{entry.body}</div>
        </div>
        
        <span className="list_item_date fs-5 text-end">{new Date(entry.date).toDateString()}</span>
        
    </ListGroup.Item>
)
}

export default EntryListItem;