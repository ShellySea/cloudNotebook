import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Signup(props) {

    const history = useHistory();
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '', cpassword: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupData;
        let response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // navigate to Home
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert('Account created successfully', 'success');
        } else {
            // error: donot allow to navigate
            props.showAlert('Invalid details', 'danger')
        }
    }

    const handleOnChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value })
    }

    return (
        <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 my-4">
                <h2>Create an account to use iNotebook</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">User name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleOnChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={handleOnChange} required minLength={5} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleOnChange} required minLength={5} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="col-lg-3"></div>
        </div>
    )
}

export default Signup
