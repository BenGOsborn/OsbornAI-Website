import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Admin({ redirect }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [failed, setFailed] = React.useState(false);

    const router = useRouter();

    React.useEffect(() => {
        if (redirect) {
            router.push("/admin/dashboard");
        }
    }, []);

    function onSubmit(e) {
        e.preventDefault();

        axios.post('/api/admin/login', { username: username, password: password })
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
            <Head>
                <title>Admin Login - OsbornAI</title>
                <meta name="description" content="Log in using your admin credentials to view the admin dashboard." />
                <meta name="keywords" content="admin, dashboard, osbornai, login, analytics, authentication, dashboard access, protected" />
                <meta name="robots" content="noindex, nofollow" />

                <meta property="og:title" content="Admin Login - OsbornAI" />
                <meta property="og:description" content="Log in using your admin credentials to view the admin dashboard." />

                <meta name="twitter:title" content="Admin Login - OsbornAI" />
                <meta name="twitter:description" content="Log in using your admin credentials to view the admin dashboard." />
            </Head>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="container">
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
            </div>
            {failed !== true ? <><br /><br /><br /></> : <></>}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export async function getServerSideProps({ req, res }) {
    const token = req.cookies.token;

    try {
        if (token) {
            await axios.post('https://osbornai-backend.herokuapp.com/admin/validate_token', { token: token });

            return { props: { redirect: true } };

        } else {
            throw 'No token!';
        }

    } catch {
        return { props: { redirect: false } };
    }
};