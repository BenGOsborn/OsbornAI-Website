import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Dashboard({ redirect, inquiry_notifications, payments, payment_ids }) {
    const router = useRouter();

    React.useEffect(() => {
        if (redirect) {
            router.push('/admin');
        } 
    });

    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
        </div>
    );
};

export async function getServerSideProps({ req, res }) {
    const token = req.cookies.token;

    let return_form = {
        redirect: true,
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