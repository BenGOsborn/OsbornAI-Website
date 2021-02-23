import React, { useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Head from 'next/head';
import { parseDate } from '../../extras/helpers';

export default function Payment({ status, payment_id_info }) {
    const [pageStatus, setPageStatus] = useState(status); // -1 is bad param, 0 is normal; 1 is error with payment; 2 is success

    function render() {
        if (pageStatus === -1) {
            return (
                <div className="container">
                    <div className="container">
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
                        <h4 style={{color: "#039be5"}}>Invalid payment URL!</h4>
                        <h5>Please check the URL and try again, or contact us so we can help to resolve the issue.</h5>
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
                </div>
            );
        } else if (pageStatus === 0 || pageStatus === 1) {
            return (
                <div className="container">
                    <div className="container">
                        <br />
                        <br />
                        <br />
                        <br />
                        <h4>Purchase information:</h4>
                        <br />
                        <br />
                        <b>Payment ID:</b>
                        <br />
                        {payment_id_info._id}
                        <br />
                        <br />
                        <b>Expiry date:</b>
                        <br />
                        {parseDate(payment_id_info.expiry)}
                        <br />
                        <br />
                        <b>Purchase:</b>
                        <div style={{whiteSpace: 'pre-line'}}>
                            {payment_id_info.purchase}
                        </div>
                        <br />
                        <b>Amount:</b>
                        <br />
                        $<span id="gtm-amount">{parseFloat(payment_id_info.amount).toFixed(2)}</span> <span id="gtm-currency">{payment_id_info.currency.toUpperCase()}</span>
                        <br />
                        <br />
                        <StripeCheckout stripeKey={process.env.STRIPE_KEY} 
                            name={payment_id_info.name}
                            description={payment_id_info.purchase}
                            amount={parseFloat(payment_id_info.amount * 100).toFixed(2)}
                            currency={payment_id_info.currency.toUpperCase()}
                            token={token => {
                                axios.post('https://osbornai-backend.herokuapp.com/pay', { token: JSON.stringify(token), payment_id: payment_id_info._id })
                                .then(res => {
                                    setPageStatus(2);
                                })
                                .catch(err => {
                                    console.log(err.response.data);
                                    setPageStatus(1);
                                });
                            }}
                        >
                            <button className="btn blue darken-1 waves-effect waves-light">
                                Pay Now
                                <i className="material-icons right">local_grocery_store</i>
                            </button>
                        </StripeCheckout>
                        {pageStatus === 1 ? <p className="flow-text" style={{color: 'red'}}>Transaction failed! Please try again!</p> : <></>}
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
            );
        } else if (pageStatus === 2) {
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
                    <h4 style={{color: "#039be5"}}>Payment succeeded!</h4>
                    <h5>Please check your email for further details!</h5>
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
        }
    };

    return (
        <div className="Pay container center" style={{fontSize: 18}} >
            <Head>
                <title>Complete The Payment Process - OsbornAI</title>
                <meta name="description" content="Complete the payment process so that we can get started working with you!" />
                <meta name="keywords" content="payment, pay, osbornai, checkout, money, buy, order" />
                <meta name="robots" content="noindex, nofollow" />

                <meta property="og:title" content="Complete The Payment Process - OsbornAI" />
                <meta property="og:description" content="Complete the payment process so that we can get started working with you!" />

                <meta name="twitter:title" content="Complete The Payment Process - OsbornAI" />
                <meta name="twitter:description" content="Complete the payment process so that we can get started working with you!" />
            </Head>
            {render()}
        </div>
    );
};

export async function getServerSideProps({ req, res }) {
    const payment_id = req.__NEXT_INIT_QUERY.slug || req.url.replace('/pay/', '');

    try {
        const res = await axios.post('https://osbornai-backend.herokuapp.com/load_payment_id', { payment_id: payment_id });
        const payment_id_info = res.data.payment_id_info;

        return { props: { status: 0, payment_id_info: payment_id_info } };

    } catch (e) {
        return { props: { status: -1, payment_id_info: null } };
    }
};