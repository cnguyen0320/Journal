import React from "react";
import {useNavigate} from "react-router-dom"

function EntryListItem({entry}){

    const navigate = useNavigate()
    const onClick = () =>{
        navigate("/viewEntry", {state:{entry:entry}})
    }

    return (
    <button 
    className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
    type="button"
    onClick={e=>{onClick()}}
    >
        
        {/* Main header for the list item*/}
        <div className="ms-2 me-auto">
            <div className="fw-bold">{entry.title}</div>
            {entry.body}
        </div>
        
        <span className="entryListItemDate">{entry.date}</span>
        
    </button>
)
}

export default EntryListItem;