import React from "react";
import {useState, useEffect} from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ConfirmModal from "../components/ConfirmModal";



function ViewEntryPage(){

    const location = useLocation()
    const navigate = useNavigate()

    const [entry, setEntry] = useState(location.state.entry)
    const [advancedView, setAdvancedView] = useState(false)
    const [modalShow, setModalShow] = useState(false);

    const navHome = () =>{
        navigate("/")
    }

    const onEdit = () =>{
        navigate("/entry", {state:{entry:entry}})
    }

    const toggleAdvancedView = () =>{
        setAdvancedView(!advancedView)
    }

    const deleteEntry = () =>{
        fetch(`/entries/${entry._id}`, {
            method: "DELETE"
        }).then(
            response => {
                if(response.status >= 200 && response.status <300){
                    navHome() // navigate home after completion
                }else{
                    console.log(response)
                    alert("An error occurred deleting your entry. Please try again")
                }
            }
        )
    }

    return (
        <div className="container text-start">
            <span className="d-flex justify-content-between align-items-start my-2">
                <h3>{entry.title}</h3>
                <span>{new Date(entry.date).toLocaleDateString()}</span>
            </span>
            <hr></hr>
            <div>{entry.body}</div>
            
            <div className="d-flex justify-content-between align-items-start my-2">
                <Button variant="secondary"
                onClick={navHome}>
                    Back
                </Button>

                <div>
                {advancedView ? 
                        <ButtonGroup>
                            <Button  className="px-4" variant="warning" onClick={onEdit}>
                                Edit
                            </Button>
                            <Button  variant="danger" onClick={()=>{setModalShow(true)}}>
                                Delete
                            </Button>
                        </ButtonGroup>
                        : null
                    }
                <Button className="ms-3" variant="outline-secondary" onClick={toggleAdvancedView}>
                    {advancedView ? "Less": "More"}
                </Button>
                </div>
            </div>            
            
        <ConfirmModal title="Delete Entry" show={modalShow} confirm={deleteEntry} onHide={()=>{setModalShow(false)}}></ConfirmModal>

        </div>

    )
}

export default ViewEntryPage;