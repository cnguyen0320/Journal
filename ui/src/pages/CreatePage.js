import React from "react";
import {useEffect, useState} from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PromptModal from "../components/PromptModal";
import { Tooltip } from 'react-tooltip'

function CreatePage(){

    const navigate = useNavigate()

    // use states title and body
    const location = useLocation()
    const [modalShow, setModalShow] = useState(false);
    const [entry_mode, setEntryMode] = useState(true)

    let entry = {title:"", body:"", date:""}
    useEffect(()=>{
        try{
            entry = location.state.entry

            document.getElementById("entry_title").value = entry.title
            document.getElementById("entry_body").value = entry.body
            
            // date needs to be converted for the input and also for the object
            document.getElementById("entry_date").value = new Date(entry.date).toISOString().substring(0,19)
            entry.date = Date.parse(document.getElementById("entry_date").value)

            setEntryMode(false)
        }catch(err){
            // this is a new entry
            let datenow = new Date()
            document.getElementById("entry_date").value = new Date(Date.parse(datenow) - datenow.getTimezoneOffset() * 60000).toISOString().substring(0,19) 

            entry.date = Date.parse(document.getElementById("entry_date").value) - new Date().getTimezoneOffset() * 60000

        }
    })

    /**
     * on Submission, we will send a POST to the server with the contents
     */
    const onSubmit = () =>{

            fetch("/entries", {
                method: entry_mode ? "POST" : "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: entry.title,
                    body: entry.body,
                    date: entry.date,
                    _id: entry._id ? entry._id : undefined

                    // TODO add more
                })
            })
            .then(
                response =>{
                    if(response.status >= 200 && response.status <300){
                        // TODO
                        navHome() // navigate home after completion
                    }else{
                        console.log(response)
                        alert("An error occurred saving your entry. Please try again")
                    }
                }
            )
        
    }

    /**
     * navigate back to default page
     */
    const navHome = () =>{
        navigate("/")
    }

    const setBody = (val)=>{
        entry.body = val
    }

    const setDate = (val)=>{
        entry.date = val
    }

    const setTitle = (val)=>{
        entry.title = val
    }

    return (
        

    <div className="container text-start">
        <h1 className="mb-5 fs-3">{entry_mode ? "New Entry" : "Modify Entry"}</h1>
        {modalShow}
        <div>
            <div className="my-3">
                
            <InputGroup className="mb-3">
            <InputGroup.Text className="fs-4">Title</InputGroup.Text>
                    <Form.Control id="entry_title" onChange={e =>{setTitle(e.target.value)}}/>
                    <Button id="prompt_button" variant="secondary" onClick={()=>{setModalShow(true)}} data-tooltip-content="Get some ideas!">
                        Stuck?
                    </Button>
                    <Tooltip anchorId="prompt_button" />
                    
            </InputGroup>
            <InputGroup className="">
            <InputGroup.Text className="fs-4">Date</InputGroup.Text>

                <Form.Control id="entry_date" type="datetime-local" className="fs-5" onChange={e =>{
                    setDate(Date.parse(e.target.value) - new Date().getTimezoneOffset() * 60000) // need to modify the time to set time in database in local time
                }}/>
            </InputGroup>
            </div>

            <div class="form-floating my-3">
                <textarea 
                rows="20"
                id="entry_body"
                className="form-control pt-5"
                placeholder="Body"
                onChange={e =>{
                    setBody(e.target.value)
                }}></textarea>
                <label className="text-secondary fs-5" for="entry_body">Tell me about it!</label>

            </div>
        </div>

        {/* Buttons */}
        <div className="my-4">

        <Button 
            className = "mx-1"
            variant="primary"
            onClick={e=>{
                onSubmit()
            }}
            >
                Submit
            </Button>

            <Button 
            className = "mx-1"
            variant="secondary"
            onClick={e=>{
                navHome()
            }}>Cancel</Button>
        </div>
    
    <PromptModal show={modalShow} onHide={()=>{setModalShow(false)}}></PromptModal>
            
    </div>

)
}

export default CreatePage;