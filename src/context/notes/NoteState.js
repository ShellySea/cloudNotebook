import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    let host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    //Fetch All Notes
    const fetchAllNotes = async () => {
        console.log('Fetching notes');
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZjkyZDhmYjE4YzAwYzg2MGNjY2ZjIn0sImlhdCI6MTYzMjY3OTk0M30.nVo04LwFQLOcDB8hmTV1Wfp5oEQ5npY9mgM6ByB1ShA'
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        console.log('Adding a new note');
        const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZjkyZDhmYjE4YzAwYzg2MGNjY2ZjIn0sImlhdCI6MTYzMjY3OTk0M30.nVo04LwFQLOcDB8hmTV1Wfp5oEQ5npY9mgM6ByB1ShA'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a Note
    const deleteNote = async (id) => {
        console.log('Fetching notes');
        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZjkyZDhmYjE4YzAwYzg2MGNjY2ZjIn0sImlhdCI6MTYzMjY3OTk0M30.nVo04LwFQLOcDB8hmTV1Wfp5oEQ5npY9mgM6ByB1ShA'
            }
        });
        const json = await response.json();
        console.log(json);
        let filtered = notes.filter((item) => {
            return item._id !== id;
        })
        setNotes(filtered)
    }

    // Edit a Note
    const editNote = async (data) => {
        let title = data.etitle;
        let description = data.edescription;
        let tag = data.etag;
        const response = await fetch(`${host}/api/notes/updatenote/${data.eid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZjkyZDhmYjE4YzAwYzg2MGNjY2ZjIn0sImlhdCI6MTYzMjY3OTk0M30.nVo04LwFQLOcDB8hmTV1Wfp5oEQ5npY9mgM6ByB1ShA'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        //Creating a deep copy
        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === data.eid) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;