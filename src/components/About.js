import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/noteContext'

function About() {
    const a = useContext(NoteContext);

    useEffect(() => {
        a.updateObj();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            This is About Component.Name is {a.obj.name} age is {a.obj.age}
        </div>
    )
}

export default About
