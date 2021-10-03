import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

export const Notes = () => {
    const context = useContext(noteContext);
    const { notes, fetchAllNotes } = context;
    useEffect(() => {
        fetchAllNotes();
    }, [])
    return (
        <>
            <Addnote />
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} title={note.title} id={note._id}
                        description={note.description} tag={note.tag} />
                })}
            </div>
        </>
    )
}
