import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Admin(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failed, setFailed] = useState(false);

    const router = useRouter();

    function onSubmit(e) {
        e.preventDefault();

        axios.post('/api/admin-login', { username: username, password: password })
        .then((res) => {
            router.push("/admin/dashboard");

            setFailed(false);
        })
        .catch((err) => {
            setFailed(true);
        });
    };

    return (
        <div className="AdminLogin">
            <br />
            <br />
            <br />
            <br />
            <div className="container">
                <h1 className="center">Admin Login</h1>
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
                {failed === true ? <p className="flow-text" style={{color: 'red'}}>Login failed. Please try again!</p> : <></>}
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export function getServerSideProps({ req, res }) {
    const token = req.cookies.token;
    // Now we need to validate if this token is correct or not before redirecting

    return { props: {  } }
};