import React from 'react'

const Noteitem = (props) => {

    const handleEdit = ($event) => {
        console.log($event)
    }
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <i className="fas fa-edit mx-2" onClick={handleEdit}></i>
                    <i className="fas fa-trash-alt mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
