import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import ListView from '../components/ListView'
import Button from 'react-bootstrap/Button';
import BeginningScreen from '../components/BeginningScreen';
import Spinner from 'react-bootstrap/Spinner';



const ENTRIES_PER_PAGE = 5

function HomePage(){
    
    const navigate = useNavigate()
    const createEntry = () =>{
        navigate("/entry")
    }

    // entries will be a state of the home page
    
    const [total_entries, setTotalEntries] = useState(0)
    const [page, setPage] = useState(0)
    const [max_page, setMaxPage] = useState(0)
    const [has_data, setData] = useState(false)

    // only load entries on initial load
    useEffect(() =>{
        let result = fetch("/entries/total",{
            method: "GET"
        })
        .then(result => result.json())
        .then(result => {
            setTotalEntries(result.count)
            setMaxPage(Math.floor(total_entries/ENTRIES_PER_PAGE))
            setData(true)
        })
    })

    



    const increment_page = () =>{
        const new_page = Math.min(page+1, max_page)
        setPage(new_page)

    }

    const decrement_page = () =>{
        const new_page = Math.max(0, page-1)
        setPage(new_page)

    }

    return (
        <div className="container text-start">
            My Journal
            { 
            has_data ? 
            total_entries == 0 ?
                <BeginningScreen></BeginningScreen> : 
                
                <div>
                    <div className="d-flex justify-content-end align-items-start my-2">                
                        <Button onClick={createEntry} variant="primary">Create New</Button>
                    </div>

                    <ListView page= {page}></ListView>
                                
                    <div className="d-flex justify-content-between align-items-start my-2">                
                            { page > 0 ? 
                                <Button onClick={decrement_page} variant="secondary">Prev</Button> : <span></span>
                            }
                            { page < max_page ?
                                <Button className="ms-2" onClick={increment_page} variant="secondary">Next</Button> : <span></span>
                            }
                    </div>
                </div>
                :
                <div>
                    <Spinner size="lg" animation="border" variant="primary"></Spinner>
                </div>
            }

            



        </div>
    )
}

export default HomePage;