import React from 'react'

const Noteitem = (props) => {
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p class="card-text">{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
