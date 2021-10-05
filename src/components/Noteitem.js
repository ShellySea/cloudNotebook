import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    let context = useContext(noteContext);

    const { deleteNote } = context;

    const { id, title, description, updateNote } = props;

    const handleEdit = (p) => {
        updateNote(p);
    }

    const handleDelete = (e) => {
        deleteNote(e.target.dataset.id);
    }

    // const handleDelete1 = (id) => {
    //     console.log(id)
    // }

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <i className="fas fa-edit mx-2" onClick={() => { handleEdit(props) }}></i>
                    <i className="fas fa-trash-alt mx-2" data-id={id} onClick={handleDelete}></i>
                    {/* <i className="fas fa-trash-alt mx-2" onClick={() => { handleDelete1(id) }}></i> */}
                </div>
            </div>
        </div>
    )
}

export default Noteitem
