import React from "react";
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react'
import { useState } from "react";


function CreatePage(){

    const navigate = useNavigate()

    // use states title and body
    const [entry_title, setTitle] = useState("")
    const [entry_body, setBody] = useState("")
    const [entry_date, setDate] = useState(new Date())

    /**
     * on Submission, we will send a POST to the server with the contents
     */
    const onSubmit = () =>{
        console.log(entry_date)
        fetch("/entries", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: entry_title,
                body: entry_body,
                date: entry_date

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

    return (
        

    <div className="container text-start">
        <h1 className="mb-5">New Entry</h1>

        <div>
            <div className="my-3">
                <label for="entry_title">Title</label>
                <input 
                id="entry_title"
                className="form-control"
                onChange={e =>{
                    setTitle(e.target.value)
                }}
                />

                <label for="entry_date">Date</label>
                <input id="entry_date" type="date" onChange={e =>{
                    setDate(Date.parse(e.target.value))
                }}/>
            </div>

            <div className="my-3">
                <label for="entry_body">Body</label>
                <textarea 
                id="entry_body"
                className="form-control"
                onChange={e =>{
                    setBody(e.target.value)
                }}></textarea>
            </div>
        </div>

        {/* Buttons */}
        <div className="my-4">

            <button 
            className="btn btn-outline-primary mx-1"
            onClick={e=>{
                onSubmit()
            }}
            >
                Submit
            </button>

            <button 
            className="btn btn-outline-secondary mx-1"
            onClick={e=>{
                navHome()
            }}>Cancel</button>
        </div>
            
    </div>
)
}

export default CreatePage;