import React from 'react'
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PromptModal(props){

    
    const [prompt, setPrompt] = useState("What was one good thing that happened today?")
    let getPrompt = () =>{
        
        fetch("/randomprompt")
        .then(response => response.text())
        .then(response => setPrompt(response))
        .catch((error)=>{
            // set default message on error
            setPrompt("What was one good thing that happened today")
        })
    }

    return (
        <Modal size="lg" centered {...props}>
            
            <Modal.Header closeButton>
                <Modal.Title>
                Here's a quote to get you thinking!
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                {prompt}
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={getPrompt}>Refresh</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PromptModal;