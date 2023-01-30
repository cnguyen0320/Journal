import React from 'react'
import EntryListItem from './EntryListItem';
import ListGroup from 'react-bootstrap/ListGroup';

function EntryList({entries}){
    // TODO
    return (
        <ListGroup>
            {entries.map((entry) => <EntryListItem key={entry.key} entry={entry}></EntryListItem>)}
        </ListGroup>
    )
}

export default EntryList;