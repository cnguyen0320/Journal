import React from 'react'
import EntryListItem from './EntryListItem';

function EntryList({entries}){
    // TODO
    return (
        <div className="list-group">
            {entries.map((entry) => <EntryListItem key={entry.key} entry={entry}></EntryListItem>)}
        </div>
    )
}

export default EntryList;