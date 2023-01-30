import React from 'react'
import EntryList from './EntryList';
import {useState, useEffect} from 'react'

const ENTRIES_PER_PAGE = 5

function ListView({page}){

    const [entries, setEntries] = useState([])

    
    /**
     * Gets the entries from the backend and saves into state
     */
    const getEntries = async () =>{
        fetch("/entries?" + new URLSearchParams({
            offset: page*ENTRIES_PER_PAGE,
            limit: ENTRIES_PER_PAGE
        }), {
            method: "GET"
        })
        .then(result => result.json())
        .then(result => {
            setEntries(result)
        })

    }
    useEffect(() =>{
        getEntries()
    }, [page])

    return (
        <EntryList entries= {entries}></EntryList>
    )
}

export default ListView;