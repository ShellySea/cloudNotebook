import React from 'react';
import { useHistory } from "react-router-dom";

function Login() {
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: e.currentTarget.elements.email.value, password: e.currentTarget.elements.password.value })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // navigate to Home
            localStorage.setItem('token', json.authtoken)
            history.push("/");
        } else {
            // error: donot allow to navigate
        }
    }

    return (
        <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 my-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="col-lg-3"></div>
        </div>
    )
}

export default Login
