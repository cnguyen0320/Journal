import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PromptModal(props){
    return (
        <Modal size="lg" centered {...props}>
            
            <Modal.Header closeButton>
                <Modal.Title>
                Here's a prompt to get you thinking!
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                What was one good thing that happened today?
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Refresh</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PromptModal;