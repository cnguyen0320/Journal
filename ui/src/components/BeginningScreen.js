import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BeginningScreen({entries}){
    const navigate = useNavigate()
    const createEntry = () =>{
        navigate("/create")
    }

    return (
        <Card className="text-black">
        <Card.Header as="h1">Welcome</Card.Header>
        <Card.Body>
          <Card.Title as="h2">You're new here!</Card.Title>
          <Card.Text className="fs-5">
            <p>Journaling is a great way to get your ideas down and destress.</p>
            <p>Let's start you off with your first entry!</p>
          </Card.Text>
          <Button onClick={createEntry} variant="primary">Create New</Button>
        </Card.Body>
      </Card>
    )
}

export default BeginningScreen;