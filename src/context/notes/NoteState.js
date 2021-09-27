import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const s1 = {
        name: "Saily",
        age: 28
    }
    const [state, setstate] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setstate({
                name: 'Omkar',
                age: 21
            })
        }, 1000);
    }

    return (
        <NoteContext.Provider value={{ obj: state, updateObj: update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;