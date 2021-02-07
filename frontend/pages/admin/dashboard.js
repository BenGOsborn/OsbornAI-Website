import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { parseDate } from '../../extras/helpers';

export default function Dashboard({ redirect, token ,inquiry_notifications, payments, payment_ids }) {
    const [inquiryNotifications, setInquiryNotifications] = React.useState(inquiry_notifications);
    const [paymentIds, setPaymentIds] = React.useState(payment_ids);

    const [purchase, setPurchase] = useState(null);
    const [amount, setAmount] = useState(null);
    const [currency, setCurrency] = useState('aud');

    const [displayCount, setDisplayCount] = useState(5);
    const [baseUrl, setBaseUrl] = useState('');

    const router = useRouter();

    React.useEffect(() => {
        if (redirect) {
            router.push('/admin');
        } 
        setBaseUrl(window.location.protocol + '//' + window.location.hostname);
    }, []);

    return (
        <div className="Dashboard">
            <Head>
                <title>Admin Dashboard - OsbornAI</title>
                <meta name="description" content="The admin dashboard containing the analytics regarding our business." />
                <meta name="keywords" content="admin, dashboard, osbornai, payments, analytics, data, osbornai, payments, payment ids, notifications, inquiries, inquire, inquiry" />
                <meta name="author" content="OsbornAI" />
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <br />
            <div style={{paddingLeft: 80, paddingRight: 80}}>
                <br />
                <div className="row">
                    <div className="container">
                        <div className="container">
                            <div className="col s12 m12 l6 center">
                                <h5>Display count:</h5>
                                <select className="browser-default" onChange={e => {setDisplayCount(e.target.value)}}>
                                    <option value={1}>1</option>
                                    <option value={5} selected="selected">5</option>
                                    <option value={10}>10</option>
                                    <option value={Infinity}>All</option>
                                </select>
                            </div>
                            <div className="col s12 m12 l6 center">
                                <h5>Logout:</h5>
                                <button className="btn blue darken-1 waves-effect waves-light" type="button" onClick={(e) => {
                                    e.preventDefault();

                                    axios.post('/api/admin/logout')
                                    .then(res => {
                                        router.push('/admin');
                                    })
                                    .catch(err => {
                                        console.log(err.response.data);
                                    });
                                }}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div className="row">
                    {/* Inquiry notifications */}
                    <div className="col s12 m12 l4">
                        <h4 className="center">Inquiry notifications:</h4>
                        {inquiryNotifications.length === 0 ? <h5 className="center">There are no current inquiry notifications!</h5> : inquiryNotifications.slice(0, displayCount).map(notification => {
                            return (
                                <div key={notification._id} className="card">
                                    <div className="card-content truncate">
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
                                                        <li id={prev_inquiry._id}>
                                                            <br />
                                                            <div className="container">
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
                                    <div className="card-action">
                                        <button className="btn blue darken-1 waves-effect waves-light" type="button" onClick={(e) => {
                                            e.preventDefault();

                                            axios.post('https://osbornai-backend.herokuapp.com/admin/delete_inquiry_notification', { token: token, inquiry_notification_id: notification._id })
                                            .then(res => {
                                                const new_inquiry_notifications = inquiryNotifications.filter(not => not._id !== notification._id);
                                                setInquiryNotifications(new_inquiry_notifications);
                                            })
                                            .catch(err => {
                                                console.log(err.response.data);
                                            });
                                        }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Payments */}
                    <div className="col s12 m12 l4">
                        <h4 className="center">Payments:</h4>
                        {payments.length === 0 ? <h5 className="center">There are no payments to display!</h5> : payments.slice(0, displayCount).map(payment => {
                            return (
                                <div key={payment.payment_id_details._id} className="card">
                                    <div className="card-content truncate">
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
                                        {parseDate(payment.charge.created * 1000)}
                                        <br />
                                        <b>Purchase:</b>
                                        <div style={{whiteSpace: 'pre-line'}}>
                                            {payment.payment_id_details.purchase}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Payment IDs */}
                    <div className="col s12 m12 l4">
                        <h4 className="center">Create a new payment ID:</h4>
                        <form onSubmit={e => {
                            e.preventDefault();

                            axios.post('https://osbornai-backend.herokuapp.com/admin/create_payment_id', { token: token, purchase: purchase, amount: amount, currency: currency })
                            .then(res => {
                                const payment_details = [res.data.payment_details];
                                const new_payment_ids = [...payment_details, ...paymentIds];
                                setPaymentIds(new_payment_ids);
                            })
                            .catch(err => {
                                console.log(err.response.data);
                            });
                        }} id="sendForm">
                            <div className="input-field">
                                <textarea className="materialize-textarea" id="purchase" placeholder="Purchase" name="purchase" required={true} onChange={e => {setPurchase(e.target.value)}} />
                                <input type="number" min={1} step={0.01} placeholder="Amount" name="amount" required={true} onChange={e => {setAmount(Math.max(1, e.target.value))}} />
                                <select className="browser-default" name="currency" onChange={e => {setCurrency(e.target.value)}}>
                                    <option value="aud" selected="selected">AUD</option>
                                    <option value="usd">USD</option>
                                </select>
                            </div>
                        </form>
                        <button className="btn blue darken-1 waves-effect waves-light" type="submit" form="sendForm">
                            Send
                            <i className="material-icons right">send</i>
                        </button>
                        <br />
                        <br />
                        <h4 className="center">Payment IDs:</h4>
                        {paymentIds.length === 0 ? <h5 className="center">There are no active payment ID's!</h5> : paymentIds.slice(0, displayCount).map(payment_id => {
                            const href = `/pay/${payment_id._id}`;
                            const payment_url = baseUrl + href;

                            return (
                                <div key={payment_id._id} className="card">
                                    <div className="card-content truncate">
                                        <b>Payment URL:</b>
                                        <br />
                                        <a href="/" onClick={e => {
                                            e.preventDefault();
                                            navigator.clipboard.writeText(payment_url);
                                            window.M.toast({html: 'Copied URL to clipboard!', displayLength: 1000});
                                        }}>
                                            {payment_url}
                                        </a>
                                        <br />
                                        <b>Payment ID:</b>
                                        <br />
                                        {payment_id._id}
                                        <br />
                                        <b>Name:</b>
                                        <br />
                                        {payment_id.name}
                                        <br />
                                        <b>Purchase:</b>
                                        <div style={{whiteSpace: 'pre-line'}}>
                                            {payment_id.purchase}
                                        </div>
                                        <b>Amount:</b>
                                        <br />
                                        ${payment_id.amount}
                                        <br />
                                        <b>Currency:</b>
                                        <br />
                                        {payment_id.currency.toUpperCase()}
                                        <br />
                                        <b>Payment creation date:</b>
                                        <br />
                                        {parseDate(payment_id.timeCreated)}
                                        <br />
                                        <b>Expiry:</b>
                                        <br />
                                        {parseInt((new Date(payment_id.expiry) - new Date().getTime()) / 8.64e7) + 1} days
                                    </div>
                                    <div className="card-action">
                                        <button className="btn blue darken-1 waves-effect waves-light" type="button" onClick={(e) => {
                                            e.preventDefault();

                                            axios.post('https://osbornai-backend.herokuapp.com/admin/delete_payment_id', { token: token, payment_id: payment_id._id })
                                            .then(res => {
                                                const new_payment_ids = paymentIds.filter(not => not._id !== payment_id._id);
                                                setPaymentIds(new_payment_ids);
                                            })
                                            .catch(err => {
                                                console.log(err.response.data);
                                            });
                                        }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
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

    let return_form = {
        redirect: true,
        token: token,
        inquiry_notifications: [],
        payments: [],
        payment_ids: []
    };

    try {
        await axios.post('https://osbornai-backend.herokuapp.com/admin/validate_token', { token: token });
        return_form.redirect = false;
    } catch {
        return { props: return_form };
    }

    try {
        const inquiry_notifications_response = await axios.post('https://osbornai-backend.herokuapp.com/admin/view_inquiry_notifications', { token: token });
        return_form.inquiry_notifications = inquiry_notifications_response.data.inquiry_notifications;
    } catch { }

    try {
        const payments_response = await axios.post('https://osbornai-backend.herokuapp.com/admin/view_payments', { token: token });
        return_form.payments = payments_response.data.payments;
    } catch { }

    try {
        const payment_ids_response = await axios.post('https://osbornai-backend.herokuapp.com/admin/view_valid_payment_ids', { token: token });
        return_form.payment_ids = payment_ids_response.data.payment_ids;
    } catch { }

    return { 
        props: { ...return_form } 
    };

};