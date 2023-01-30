import React from "react";
import {useState, useEffect} from 'react'
import {useNavigate, useLocation} from "react-router-dom"


function ViewEntryPage(){

    const location = useLocation()
    const navigate = useNavigate()

    const entry = location.state.entry;

    const navHome = () =>{
        navigate("/")
    }


    return (
        <div className="container text-start">
            <span className="">
                <h3>{entry.title}</h3>
                <span>{new Date(entry.date).toLocaleDateString()}</span>
            </span>
            <hr></hr>
            <div>{entry.body}</div>
            
            <div>
            
            <button 
            className="btn btn-warning mx-1"
            onClick={e=>{  }}>
                Edit
            </button>

            <button className="btn btn-secondary"
            onClick={navHome}>
                Back
            </button>

            </div>
            
        </div>

    )
}

export default ViewEntryPage;