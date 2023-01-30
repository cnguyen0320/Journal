import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal(props){
    return (
        <Modal size="lg" centered {...props}>
            
            <Modal.Header closeButton>
                <Modal.Title>
                {props.title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                Are you sure? This cannot be undone.
                </p>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between align-items-start my-2">
                <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
                <Button variant="danger" onClick={props.confirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal;