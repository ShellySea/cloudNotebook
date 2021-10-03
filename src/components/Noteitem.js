import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    let context = useContext(noteContext);

    const { deleteNote, editNote } = context;

    const handleEdit = ($event) => {
        console.log($event);
        editNote();
    }

    const handleDelete = (e) => {
        //console.log(e);
        deleteNote(e.target.dataset.id);
    }

    // const handleDelete1 = (id) => {
    //     console.log(id)
    // }

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <i className="fas fa-edit mx-2" onClick={handleEdit}></i>
                    <i className="fas fa-trash-alt mx-2" data-id={props.id} onClick={handleDelete}></i>
                    {/* <i className="fas fa-trash-alt mx-2" onClick={() => { handleDelete1(props.id) }}></i> */}
                </div>
            </div>
        </div>
    )
}

export default Noteitem
