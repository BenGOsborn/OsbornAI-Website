import {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../components/header-logo.png';
import axios from 'axios';
import FormData from 'form-data';

// Is it safe to have the auth token on the front end?  
const AdminDashboard = () => {
    const [notifications, setNotifications] = useState([]);
    const [paymentIds, setPaymentIds] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const token_form = new FormData();
        token_form.append('token', token)

        axios.post('https://osbornai.herokuapp.com/admin/view_inquiry_notifications', token_form)
        .then((res) => {
            const form = res.data;

            const inquiries = form.inquiries;
            setNotifications(inquiries);
        })
        .catch((err) => {
            window.location.reload();
        });

        axios.post('https://osbornai.herokuapp.com/admin/view_valid_payment_ids', token_form)
        .then((res) => {
            const form = res.data;

            const payment_ids = form.payment_ids;
            setPaymentIds(payment_ids);
        })
        .catch((err) => {
            window.location.reload();
        });
        

    }, []);

    const displayInquiryNotifications = () => {
        // Operations: View, Delete

        return (
            <>
                {/* If there is none then I want to return "There are no new cards!" */}
                {/* I also dont want to render all of their previous inquiries, maybe Ill just render the first three */}
                <h4 class="center">New Notifications</h4> 
                {notifications.map((notification) => {
                    return (
                        <li key={notification._id}>
                            <div class="card">
                                <div class="card-content">
                                    <div className="Name">
                                        <b>Name:</b> {notification.first} {notification.last}
                                    </div>
                                    <div className="Email">
                                        <b>Email:</b> {notification.email}
                                    </div>
                                    <div className="NewInquiry">
                                        {/* Maybe I want to convert UTC to Australian time */}
                                        {/* I need better formatting of this date */}
                                        <b>Inquiry date:</b> {notification.new_inquiry.inquiry_date} 
                                        <br />
                                        <b>Inquiry:</b> {notification.new_inquiry.inquiry}
                                    </div>
                                    <div className="PreviousInquiries">
                                        <b>Previous inquiries:</b>
                                        <br />
                                        {/* If there are none then we will return a "Null" message */}
                                        {notification.previous_inquiries}
                                    </div>
                                    <div className="UserSpendings">
                                        <b>Total spent:</b> ${notification.user_spent}
                                    </div>
                                </div>
                                <div class="card-action">
                                    {/* I also need a delete button down here */}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </>
        );
    };

    const displayPaymentIds = () => {

    };

    return (
        <div className="Header">
            <div className="Top" />
            <header>
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper blue darken-1 center">
                            <Link class="brand-logo center" href="/" to="/" smooth={true} duration={400} style={{fontSize: 34}}>
                                <div class="valign-wrapper row">
                                    <div class="col valign-wrapper">
                                        <img class="center" src={headerLogo} alt="OsbornAI logo" width="42" height="42"/>
                                    </div>
                                    <div class="col valign-wrapper">
                                        OSBORNAI
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>
            <div class="container">
                <br />
                <br />
                <br />
                <br />
                <div class="row">
                    <ul class="col s12 m12 l6">
                        {displayInquiryNotifications()}
                    </ul>
                    <ul class="col s12 m12 l6">
                        {displayPaymentIds()}
                    </ul>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    );
};

export default AdminDashboard;