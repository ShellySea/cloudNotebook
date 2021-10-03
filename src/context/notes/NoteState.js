import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const notesinitial = [
        {
            "_id": "6150b83c463c9247c19d6f6a",
            "user": "614f92d8fb18c00c860cccfc",
            "title": "Daily1",
            "description": "Learn React Course",
            "tag": "learning",
            "date": "2021-09-26T18:13:16.378Z",
            "__v": 0
        },
        {
            "_id": "6150ba9e6777d9fbd189dd1a",
            "user": "614f92d8fb18c00c860cccfc",
            "title": "Daily2",
            "description": "Learn Node Course",
            "tag": "learning",
            "date": "2021-09-26T18:23:26.466Z",
            "__v": 0
        },
        {
            "_id": "6150bad6aeea2ec31e33ecc6",
            "user": "614f92d8fb18c00c860cccfc",
            "title": "Daily3",
            "description": "Learn MongoDB Course",
            "tag": "learning",
            "date": "2021-09-26T18:24:22.619Z",
            "__v": 0
        },
        {
            "_id": "6150cca5895d90e998f6e589",
            "user": "614f92d8fb18c00c860cccfc",
            "title": "Daily updated",
            "description": "Learn Express Course",
            "tag": "learning",
            "date": "2021-09-26T19:40:21.610Z",
            "__v": 0
        },
        {
            "_id": "6150ce9f44cfb6c4407a4a32",
            "user": "614f92d8fb18c00c860cccfc",
            "title": "Daily4",
            "description": "Learn Angular Course",
            "tag": "learning",
            "date": "2021-09-26T19:48:47.761Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(notesinitial);

    // Add a Note
    const addNote = (title, description, tag) => {
        console.log('Adding a new note')
        const note = {
            "_id": "6150ce9f44cfb6c4407a4a21",
            "user": "614f92d8fb18c00c860cccfc",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-10-01T19:48:47.761Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    // Delete a Note
    const deleteNote = (id) => {
        let filtered = notes.filter((item) => {
            return item._id !== id;
        })
        setNotes(filtered)
    }

    // Edit a Note
    const editNote = (id) => {

    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;