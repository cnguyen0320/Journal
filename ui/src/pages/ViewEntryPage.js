import React from "react";
import {useState, useEffect} from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ConfirmModal from "../components/ConfirmModal";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';


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
            <Card classsName="text-black">
            <Card.Header>
                <span className="d-flex justify-content-between align-items-start my-2">
                    <h1>{entry.title}</h1>
                    <span className="fs-4">{new Date(entry.date).toLocaleDateString()}</span>
                </span>
            </Card.Header>
            <Card.Body className="view_body">
                <Card.Text className="fs-4">{entry.body}</Card.Text>
            </Card.Body>       
                
                <Card.Footer className="d-flex justify-content-between align-items-end">
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
                
                </Card.Footer>
            </Card>
            <ConfirmModal title="Delete Entry" show={modalShow} confirm={deleteEntry} onHide={()=>{setModalShow(false)}}></ConfirmModal>

        </div>

    )
}

export default ViewEntryPage;