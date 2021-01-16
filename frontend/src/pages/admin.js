import { useState, useEffect } from 'react'; import '../form.css';
import axios from 'axios';
import FormData from 'form-data';
import AdminDashboard from './admin-dashboard';

// This component will be ran before every single login and will take in the prop of the component and then will render it
// If the login is successful then it will render the component, if not then it will not render the component
const Admin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [render, setRender] = useState(null);
    // Might just set the token in the state
    // Combine the states into one so I can change the page at will

    useEffect(() => {
        const local_token = localStorage.getItem('token');
        if (local_token === null) {
            setRender(false);
            return
        }

        const form = new FormData();
        form.append('token', local_token);
        
        axios.post('https://osbornai.herokuapp.com/admin/validate_token', form)
        .then((res) => {
            const form = res.data;

            if (form.success !== true) {
                setRender(false);
                return
            }

            setRender(true);
        })
        .catch((err) => {
            setRender(false);
        });
    }, []);

    const sendLogin = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('username', username);
        form.append('password', password);

        axios.post("https://osbornai.herokuapp.com/admin/login", form)
        .then((res) => {
            const form = res.data;

            const success = form.success;
            const token = form.token;
            if (success !== true || token === null) {
                setRender(false);
                e.target.reset();
                return
            }

            localStorage.setItem('token', token);
            setRender(true);
        })
        .catch((err) => {
            setRender(false);
            e.target.reset();
        });
    };

    const isDisplayed = () => {
        if (render === null) {
            return (
                <div class="container center">
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
                    <br />
                    <br />
                    <h4 style={{color: '#039be5'}}>Loading...</h4>
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
                    <br />
                    <br />
                </div>
            );
        } else if (render === true) {
            return (
                <>
                    <AdminDashboard />
                </>
            );
        } else {
            return (
                <div className="AdminLogin">
                    <div className="Top" /> 
                    <div class="container center">
                        <div class="container">
                            <div class="container">
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
                                <h1>Admin Login</h1>
                                <form onSubmit={sendLogin} id="sendForm">
                                    <div class="input-field">
                                        <input type="text" placeholder="Username" name="username" required={true} onChange={(e) => {setUsername(e.target.value)}} />
                                        <input type="password" placeholder="Password" name="password" required={true} onChange={(e) => {setPassword(e.target.value)}} />
                                    </div>
                                </form>
                                <button class="btn blue darken-1 waves-effect waves-light" type="submit" form="sendForm">
                                    Login
                                    <i class="material-icons right">send</i>
                                </button>
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
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            {isDisplayed()}
        </>
    );
};

export default Admin;