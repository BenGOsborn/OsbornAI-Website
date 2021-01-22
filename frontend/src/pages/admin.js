import { useState, useEffect } from 'react'; import '../form.css';
import axios from 'axios';
import FormData from 'form-data';
import { Link } from 'react-router-dom';
import analytics from '../analytics';
import { Helmet } from 'react-helmet';

const Admin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [render, setRender] = useState(0); // 0 = Loading, 1 = Login, 2 = Dashboard

    const [numDisplayed, setNumDisplayed] = useState(5);

    const [notifications, setNotifications] = useState([]);
    const [paymentIds, setPaymentIds] = useState([]);
    const [payments, setPayments] = useState([]); 

    const [purchase, setPurchase] = useState('');
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('aud');

    // This is going to be our initial load that will either authenticate a token or require a login
    useEffect(() => {
        analytics.init();
        analytics.sendPageview('/admin');

        setRender(0);

        const local_token = localStorage.getItem('token');
        if (local_token === null) {
            setToken(null);
            setRender(1);
            return
        }

        const form = new FormData();
        form.append('token', local_token);
        
        axios.post('https://osbornai.herokuapp.com/admin/validate_token', form)
        .then((res) => {
            setToken(local_token);

            setRender(2);
        })
        .catch((err) => {
            const form = err.response.data;

            if (form.error_code === 24) {
                setToken(null);
                setRender(1);
            } else {
                setToken(null);
                setRender(1);
            }
        });
    }, []);

    const parseDate = (date_raw) => {
        const pad = (n, width, z) => {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;  
        };

        const date = new Date(date_raw);

        return `${pad(date.getDate(), 2)}/${pad(date.getMonth() + 1, 2)}/${pad(date.getFullYear(), 2)} at ${pad(date.getHours(), 2)}:${pad(date.getSeconds(), 2)}`;
    };

    // This is going to track the render component and whenever it is called then we are going to make a call to the api to change it
    useEffect(() => {
        if (render === 2) {
            if (token === null) {
                setRender(1);

                return;
            }

            const token_form = new FormData();
            token_form.append('token', token)

            axios.post('https://osbornai.herokuapp.com/admin/view_inquiry_notifications', token_form)
            .then((res) => {
                const form = res.data;

                setNotifications(form.inquiry_notifications);
            })
            .catch((err) => {
                const form = err.response.data;

                if (form.error_code === 24) {
                    setToken(null);

                    setNotifications([]);

                    setRender(1);
                } else {
                    setNotifications([]);
                }
            });

            axios.post('https://osbornai.herokuapp.com/admin/view_valid_payment_ids', token_form)
            .then((res) => {
                const form = res.data;

                setPaymentIds(form.payment_ids);
            })
            .catch((err) => {
                const form = err.response.data;

                if (form.error_code === 24) {
                    setToken(null);

                    setPaymentIds([]);

                    setRender(1);
                } else {
                    setPaymentIds([]);
                }
            });

            axios.post('https://osbornai.herokuapp.com/admin/view_payments', token_form)
            .then((res) => {
                const form = res.data;

                setPayments(form.payments);
            })
            .catch((err) => {
                const form = err.response.data;

                if (form.error_code === 24) {
                    setToken(null);

                    setPayments([]);

                    setRender(1);
                } else {
                    setPayments([]);
                }
            });
        }
    }, [render, token]);

    const isDisplayed = () => {
        if (render === 0) {
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
                </div>
            );
        } else if (render === 1) {
            const sendLogin = (e) => {
                setRender(0);

                e.preventDefault();

                const form = new FormData();
                form.append('username', username);
                form.append('password', password);

                axios.post("https://osbornai.herokuapp.com/admin/login", form)
                .then((res) => {
                    const form = res.data;

                    const token = form.token;
                    localStorage.setItem('token', token);
                    setToken(token);

                    setRender(2);
                })
                .catch((err) => {
                    setRender(1);
                });

                e.target.reset();
            };

            return (
                <div className="Login">
                    <div class="container center">
                        <div class="container">
                            <div class="container">
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
                                <Helmet>
                                    <title>Admin Login - OsbornAI</title>
                                    <meta name="description" content="Log in using the admin credentials to view the admin dashboard." />
                                    <meta name="keywords" content="admin, dashboard, osbornai, login, analytics" />
                                </Helmet>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            const deleteNotification = (e, id) => {
                e.preventDefault();

                const token = localStorage.getItem('token');

                const delete_form = new FormData();
                delete_form.append('token', token);
                delete_form.append('inquiry_notification_id', id);

                axios.post('https://osbornai.herokuapp.com/admin/delete_inquiry_notification', delete_form)
                .then((res) => {
                    const filtered_notifications = notifications.filter((notification) => {return notification._id !== id});
                    setNotifications(filtered_notifications);
                })
                .catch((err) => {
                    const form = err.response.data;

                    if (form.error_code === 24) {
                        setToken(null);

                        setNotifications([]);

                        setRender(1);
                    } else {
                        setNotifications([]);
                    }
                });
            };

            const newPaymentId = (e) => {
                e.preventDefault();

                const payment_form = new FormData();
                payment_form.append('token', token);
                payment_form.append('purchase', purchase);
                payment_form.append('amount', amount);
                payment_form.append('currency', currency);

                axios.post('https://osbornai.herokuapp.com/admin/create_payment_id', payment_form)
                .then((res) => {
                    const form = res.data;

                    const new_paymentIds = [form].concat(paymentIds);
                    setPaymentIds(new_paymentIds);
                })
                .catch((err) => {
                    const form = err.response.data;

                    if (form.error_code === 24) {
                        setToken(null);

                        setPaymentIds([]);

                        setRender(1);
                    } else {
                        setPaymentIds([]);
                    }
                });

                e.target.reset();
            };

            return (
                <div className="Dashboard">
                    <div class="row center">
                        <div class="col s12 s12 l6">
                            <div class="container">
                                <div class="container">
                                    <h5>Number Of Items Displayed</h5>
                                    <br />
                                    <select class="browser-default" name="numdisplayed" onChange={(e) => {setNumDisplayed(e.target.value)}}>
                                        <option value={1}>1</option>
                                        <option value={5} selected="selected">5</option>
                                        <option value={10}>10</option>
                                        <option value={Infinity}>All</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 s12 l6">
                            <div class="container">
                                <div class="container">
                                    <h5>Logout</h5>
                                    <br />
                                    <button class="btn blue darken-1 waves-effect waves-light" onClick={(e) => {
                                        e.preventDefault();

                                        localStorage.removeItem('token');

                                        setToken(null);
                                    }}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div class="row center">
                        <div class="col s12 m12 l4">
                            <div class="container">
                                <h4>New Inquiries</h4> 
                                <br />
                                <ul>
                                    {notifications.length === 0 ? 
                                        <li>
                                            <h5 class="center">There are no new inquiries!</h5>
                                        </li>
                                        :notifications.slice(0, numDisplayed).map((notification) => {
                                            return (
                                                <li key={notification._id}>
                                                    <div class="card">
                                                        <div class="card-content truncate">
                                                            <b>Name:</b> 
                                                            <br />
                                                            {notification.first} {notification.last}
                                                            <br />
                                                            <b>Email:</b>
                                                            <br />
                                                            {notification.email}
                                                            <br />
                                                            <b>Inquiry date:</b>
                                                            <br />
                                                            {parseDate(notification.inquiry_date)} 
                                                            <br />
                                                            <b>Inquiry:</b> 
                                                            <br />
                                                            {notification.inquiry}
                                                            <br />
                                                            <b>Total spent:</b>
                                                            <br />
                                                            ${notification.user_spent}
                                                            <br />
                                                                <b>Previous inquiries:</b>
                                                                <br />
                                                                <ul>
                                                                    {notification.prev_inquiries.slice(0, 3).map((prev_inquiry) => {
                                                                        return (
                                                                            <li id={Math.random().toString(36).substring(7)}>
                                                                                <br />
                                                                                <div class="container">
                                                                                    <b>Previous inquiry date:</b>
                                                                                    <br />
                                                                                    {parseDate(prev_inquiry.inquiry_date)}
                                                                                    <br />
                                                                                    <b>Previous inquiry:</b>
                                                                                    <br />
                                                                                    {prev_inquiry.inquiry}
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                        </div>
                                                        <div class="card-action">
                                                            <button class="btn blue darken-1 waves-effect waves-light" onClick={(e) => {deleteNotification(e, notification._id)}}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div class="col s12 m12 l4">
                            <div class="container">
                                <h4>Recent Payments</h4>
                                <br />
                                <ul>
                                    {payments.length === 0 ?
                                    <li>
                                        <h5>There are no payments available!</h5>
                                    </li>
                                    :payments.slice(0, numDisplayed).map((payment) => {
                                        return (
                                            <li key={payment.payment_id_details._id}>
                                                <div class="card">
                                                    <div class="card-content truncate">
                                                        <b>Payment ID:</b>
                                                        <br />
                                                        {payment.payment_id_details._id}
                                                        <br />
                                                        <b>Payment creation date:</b>
                                                        <br />
                                                        {parseDate(payment.payment_id_details.timeCreated)}
                                                        <br />
                                                        <b>Client email:</b>
                                                        <br />
                                                        {payment.stripe_token.email}
                                                        <br />
                                                        <b>Amount:</b>
                                                        <br />
                                                        ${payment.payment_id_details.amount} {payment.payment_id_details.currency.toUpperCase()}
                                                        <br />
                                                        <b>Purchase date:</b>
                                                        <br />
                                                        {parseDate(payment.payment_intent.created * 1000)}
                                                        <br />
                                                        <b>Purchase:</b>
                                                        <div style={{whiteSpace: 'pre-line'}}>
                                                            {payment.payment_id_details.purchase}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div class="col s12 m12 l4">
                            <div class="container">
                                <h4>Create a new payment ID</h4>
                                <form onSubmit={newPaymentId} id="sendForm">
                                    <div class="input-field">
                                        <textarea class="materialize-textarea" id="purchase" placeholder="Purchase" name="purchase" required={true} onChange={(e) => {setPurchase(e.target.value)}} />
                                        <input type="number" min={1} step={0.01} placeholder="Amount" name="amount" required={true} onChange={(e) => {
                                                if (e.target.value < 1) {
                                                    setAmount(1);
                                                } else {
                                                    setAmount(e.target.value);
                                                }
                                            }} />
                                        <select class="browser-default" name="currency" onChange={(e) => {setCurrency(e.target.value)}}>
                                            <option value="aud">AUD</option>
                                            <option value="usd">USD</option>
                                        </select>
                                    </div>
                                </form>
                                <button class="btn blue darken-1 waves-effect waves-light" type="submit" form="sendForm">
                                    Send
                                    <i class="material-icons right">send</i>
                                </button>
                                <br />
                                <br />
                                <br />
                                <br />
                                <h4>Payment ID's</h4>
                                <br />
                                <ul>
                                    {paymentIds.length === 0 ? 
                                    <li>
                                        <h5 class="center">There are no current payment ID's!</h5>
                                    </li>
                                    :paymentIds.slice(0, numDisplayed).map((payment_details) => {
                                        const href = `/pay/${payment_details._id}`;

                                        let payment_url = null;
                                        if (window.location.href.endsWith('/')) {
                                            payment_url = `${window.location.href.slice(0, -7)}${href}`;
                                        } else {
                                            payment_url = `${window.location.href.slice(0, -6)}${href}`;
                                        }

                                        return (
                                            <li key={payment_details._id}>
                                                <div class="card">
                                                    <div class="card-content truncate">
                                                        <b>Payment URL:</b>
                                                        <br />
                                                        <Link to={href} onClick={(e) => {e.preventDefault();navigator.clipboard.writeText(payment_url);window.M.toast({html: 'Copied URL to clipboard!', displayLength: 1000});}}>{payment_url}</Link>
                                                        <br />
                                                        <b>Payment ID:</b>
                                                        <br />
                                                        {payment_details._id}
                                                        <br />
                                                        <b>Name:</b>
                                                        <br />
                                                        {payment_details.name}
                                                        <br />
                                                        <b>Purchase:</b>
                                                        <div style={{whiteSpace: 'pre-line'}}>
                                                            {payment_details.purchase}
                                                        </div>
                                                        <b>Amount:</b>
                                                        <br />
                                                        ${payment_details.amount}
                                                        <br />
                                                        <b>Currency:</b>
                                                        <br />
                                                        {payment_details.currency.toUpperCase()}
                                                        <br />
                                                        <b>Payment creation date:</b>
                                                        <br />
                                                        {parseDate(payment_details.timeCreated)}
                                                        <br />
                                                        <b>Expiry:</b>
                                                        <br />
                                                        {parseInt((new Date(payment_details.expiry) - new Date().getTime()) / 8.64e7) + 1} days
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Helmet>
                        <title>Admin Dashboard - OsbornAI</title>
                        <meta name="description" content="The admin dashboard containing the analytics regarding our business." />
                        <meta name="keywords" content="admin, dashboard, osbornai, payments, analytics" />
                    </Helmet>
                </div>
            );
        }
    };

    return (
        <div className="Admin">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {isDisplayed()}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Helmet>
                <meta name="author" content="OsbornAI" />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
        </div>
    );
};

export default Admin;