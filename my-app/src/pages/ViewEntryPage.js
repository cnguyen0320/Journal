import React from "react";
import {useNavigate, useLocation} from "react-router-dom"


function ViewEntryPage(){

    const location = useLocation()
    const navigate = useNavigate()

    const entry = location.state.entry;

    const navHome = () =>{
        navigate("/")
    }

    return (
        <div>
            <h3>{entry.title}</h3>
            <hr></hr>
            <div>{entry.body}</div>
            <button className="btn btn-secondary"
            onClick={navHome}>
                Back
            </button>
        </div>

    )
}

export default ViewEntryPage;