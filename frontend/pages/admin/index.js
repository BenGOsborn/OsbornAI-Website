import React, { useState } from 'react';
import axios from 'axios';

export default function Admin(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onSubmit(e) {
        e.preventDefault();

        axios.post('/api/admin-login', { username: username, password: password }).then((res) => console.log(res)).catch((err) => console.log(err));
    };

    return (
        <>
            <div className="AdminLogin">
                <div className="container">
                    <h1>Admin Login</h1>
                    <form onSubmit={onSubmit} id="login">
                        <div className="input-field">
                            <input type="text" placeholder="Username" name="username" required={true} onChange={(e) => {setUsername(e.target.value)}} />
                            <input type="password" placeholder="Password" name="password" required={true} onChange={(e) => {setPassword(e.target.value)}} />
                        </div>
                    </form>
                    <button className="btn blue darken-1 waves-effect waves-light" type="submit" form="login">
                        Login
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </>
    );
};