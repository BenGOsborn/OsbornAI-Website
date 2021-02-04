import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const parseDate = (date_raw) => {
    const pad = (n, width) => {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;  
    };

    const date = new Date(date_raw);

    return `${pad(date.getDate(), 2)}/${pad(date.getMonth() + 1, 2)}/${pad(date.getFullYear(), 2)} at ${pad(date.getHours(), 2)}:${pad(date.getSeconds(), 2)}`;
};

export default function Dashboard({ redirect, token ,inquiry_notifications, payments, payment_ids }) {
    const [inquiryNotifications, setInquiryNotifications] = React.useState(inquiry_notifications);
    const [prevPayments, setPrevPayments] = React.useState(payments);
    const [paymentIds, setPaymentIds] = React.useState(payment_ids);

    const router = useRouter();

    React.useEffect(() => {
        if (redirect) {
            router.push('/admin');
        } 
    });

    return (
        <div className="Dashboard">
            <div style={{paddingLeft: 80, paddingRight: 80}}>
                <div className="row">
                    {/* Inquiry notifications */}
                    <div className="col s12 m12 l4">
                        <h4 className="center">Inquiry notifications:</h4>
                        {inquiryNotifications.length === 0 ? <h5 className="center">There are no current inquiry notifications!</h5> : inquiryNotifications.map(notification => {
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
                                        <button class="btn blue darken-1 waves-effect waves-light" type="button" onClick={(e) => {
                                            e.preventDefault();

                                            axios.post('https://osbornai.herokuapp.com/admin/delete_inquiry_notification', { token: token, inquiry_notification_id: notification._id })
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
                        {payments.length === 0 ? <h5 className="center">There are no payments to display!</h5> : payments.map(payment => {
                            return (
                                <div key={payment.payment_id_details._id} className="card">
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

                            axios.post('https://osbornai.herokuapp.com/admin/create_payment_id', { token: token, purchase: purchase, amount: amount, currency: currency })
                            .then()
                            .catch();
                        }} id="sendForm">
                            <div className="input-field">
                                <textarea className="materialize-textarea" id="purchase" placeholder="Purchase" name="purchase" required={true} onChange={(e) => {setPurchase(e.target.value)}} />
                                <input type="number" min={1} step={0.01} placeholder="Amount" name="amount" required={true} onChange={(e) => {setAmount(Math.max(1, e.target.value))}} />
                                <select className="browser-default" name="currency" onChange={(e) => {setCurrency(e.target.value)}}>
                                    <option value="aud">AUD</option>
                                    <option value="usd">USD</option>
                                </select>
                            </div>
                        </form>
                        <button class="btn blue darken-1 waves-effect waves-light" type="submit" form="sendForm">
                            Send
                            <i class="material-icons right">send</i>
                        </button>
                        <h4 className="center">Payment IDs:</h4>
                        {paymentIds.length === 0 ? <h5 className="center">There are no active payment ID's!</h5> : paymentIds.map(payment_id => {
                            const href = `/pay/${payment_id._id}`;
                            const payment_url = window.location.protocol + '//' + window.location.hostname + href;

                            return (
                                <div key={payment_id._id} className="card">
                                    <div class="card-content truncate">
                                        <b>Payment URL:</b>
                                        <br />
                                        <Link href={href} onClick={e => {
                                            e.preventDefault();
                                            navigator.clipboard.writeText(payment_url);
                                            window.M.toast({html: 'Copied URL to clipboard!', displayLength: 1000});
                                        }}>
                                            <a>{payment_url}</a>
                                        </Link>
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
                            );
                        })}
                    </div>
                </div>
            </div>
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
        await axios.post('https://osbornai.herokuapp.com/admin/validate_token', { token: token });
        return_form.redirect = false;
    } catch {
        return { props: return_form };
    }

    try {
        const inquiry_notifications_response = await axios.post('https://osbornai.herokuapp.com/admin/view_inquiry_notifications', { token: token });
        return_form.inquiry_notifications = inquiry_notifications_response.data.inquiry_notifications;
    } catch { }

    try {
        const payments_response = await axios.post('https://osbornai.herokuapp.com/admin/view_payments', { token: token });
        return_form.payments = payments_response.data.payments;
    } catch { }

    try {
        const payment_ids_response = await axios.post('https://osbornai.herokuapp.com/admin/view_valid_payment_ids', { token: token });
        return_form.payment_ids = payment_ids_response.data.payment_ids;
    } catch { }

    return { 
        props: { ...return_form } 
    };

};