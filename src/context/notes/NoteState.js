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
        }).then(resp => console.log(resp)).catch(err => console.log(`Err is ${err}`))
        // const json = response.json();
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
    const deleteNote = async (id) => {
        let filtered = notes.filter((item) => {
            return item._id !== id;
        })
        setNotes(filtered)
    }

    // Edit a Note
    const editNote = async (data) => {
        let title = data.title;
        let description = data.description;
        let tag = data.tag;
        const response = await fetch(`${host}/api/notes/updatenote/${data.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZjkyZDhmYjE4YzAwYzg2MGNjY2ZjIn0sImlhdCI6MTYzMjY3OTk0M30.nVo04LwFQLOcDB8hmTV1Wfp5oEQ5npY9mgM6ByB1ShA'
            },
            body: JSON.stringify({ title, description, tag })
        }).then(resp => console.log(resp)).catch(err => console.log(err))
        const json = response.json();

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === data.id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;