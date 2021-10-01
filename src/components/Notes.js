import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

export const Notes = () => {
    const context = useContext(noteContext);
    console.log(context);
    const { notes, setNotes } = context;
    return (
        <div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    console.log(note)
                    return <Noteitem key={note._id} title={note.title} description={note.description} tag={note.tag} />
                })}
            </div>
        </div>
    )
}
