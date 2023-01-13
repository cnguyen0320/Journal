import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import EntryList from '../components/EntryList'



const TEST = true;

function HomePage(){
    
    const navigate = useNavigate()

    // entries will be a state of the home page
    const [entries, setEntries] = useState([])

    /**
     * Gets the entries from the backend and saves into state
     */
    const getEntries = async () =>{

        if(TEST){
            setEntries([
                {
                    id:1, 
                    title:"title", 
                    body:"body"
                }, 
                {
                    id:2,
                    title:"title2", 
                    body:"body2"
                }
            ])
            return
        }

        fetch("/entries")
        .then(result => result.json())
        .then(result => setEntries(result))

    }

    // only load entries on initial load
    useEffect(() =>{
        getEntries()
    }, [])

    const createEntry = () =>{
        navigate("/create")
    }

    return (
        <div className="container">
            <EntryList entries= {entries}></EntryList>
            <button onClick={createEntry}>Create</button>
        </div>
    )
}

export default HomePage;