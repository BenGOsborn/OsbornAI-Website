import { useState } from 'react';
import '../form.css';

// Except this component will not be on its own seperate page it will be on the admin dashboard and pages to be put up if there is ever a failure
const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const sendLogin = (e) => {
        e.preventDefault();
    };

    return (
        <div className="AdminLogin">
            <div class="container center">
                <div class="container">
                    <div class="container">
                        <h1>Admin login</h1>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;