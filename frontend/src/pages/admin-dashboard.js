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
        // Operations: View, Delete, 
    };

    const displayPaymentLinks = () => {

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
                {/* Store my two seperate dashboard views in their own seperate cols in a row */}
                <h1>Hello</h1>
            </div>
        </div>
    );
};

export default AdminDashboard;