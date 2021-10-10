import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useHistory } from 'react-router';

export const Notes = (props) => {

    const context = useContext(noteContext);
    const { notes, fetchAllNotes, editNote } = context;
    let history = useHistory();
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "default", eid: "" })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchAllNotes();
        } else {
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, eid: currentNote.id });
    }

    const onUpdate = (n) => {
        editNote(n);
        close.current.click();
        props.showAlert('Note updated successfully', 'success');
    }

    const close = useRef(null);

    const ref = useRef(null);

    const handleFields = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#myModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" required minLength={5}
                                        value={note.etitle} aria-describedby="emailHelp" onChange={handleFields} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="edescription" name="edescription"
                                        required minLength={5} value={note.edescription} onChange={handleFields} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag"
                                        required minLength={5} value={note.etag} onChange={handleFields} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={close}>Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary" onClick={() => { onUpdate(note) }}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.length === 0 && <h6 className="text-center">No Notes Available!</h6>}
                {notes.length > 0 && notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} title={note.title} id={note._id}
                        description={note.description} tag={note.tag} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}
