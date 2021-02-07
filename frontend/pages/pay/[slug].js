import React, { useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Head from 'next/head';
import { parseDate } from '../../extras/helpers';
import { sendEvent } from '../../extras/analytics';
import { useRouter } from 'next/router';

export default function Payment(props) {
    const [status, setStatus] = useState(0); // -1 is bad param, 0 is normal; 1 is error; 2 is success
    const [paymentIdDetails, setPaymentIdDetails] = useState({});
    const router = useRouter();

    React.useEffect(() => {
        console.log(router.query.slug);

        axios.post('https://osbornai-backend.herokuapp.com/load_payment_id', { payment_id: router.query.slug })
        .then((res) => {
            const payment_id_details = payment_id_details_response.data.payment_id_info;
            setPaymentIdDetails(payment_id_details);

            console.log(payment_id_details);
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    }, []);

    function render() {
        if (status === 0 || status === 1) {
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
                        {paymentIdDetails._id}
                        <br />
                        <br />
                        <b>Expiry date:</b>
                        <br />
                        {parseDate(paymentIdDetails.expiry)}
                        <br />
                        <br />
                        <b>Purchase:</b>
                        <div style={{whiteSpace: 'pre-line'}}>
                            {paymentIdDetails.purchase}
                        </div>
                        <br />
                        <b>Amount:</b>
                        <br />
                        {/* ${paymentIdDetails.amount} {paymentIdDetails.currency.toUpperCase()} */}
                        <br />
                        <br />
                        <StripeCheckout stripeKey={process.env.STRIPE_KEY} 
                            name={paymentIdDetails.name}
                            description={paymentIdDetails.purchase}
                            amount={paymentIdDetails.amount * 100}
                            // currency={paymentIdDetails.currency.toUpperCase()}
                            token={token => {
                                axios.post('https://osbornai-backend.herokuapp.com/pay', { token: JSON.stringify(token), payment_id: paymentIdDetails._id })
                                .then(res => {
                                    setStatus(2);

                                    sendEvent({ category: 'User', action: 'Completed payment' });
                                })
                                .catch(err => {
                                    console.log(err.response.data);
                                    setStatus(1);
                                });
                            }}
                        >
                            <button className="btn blue darken-1 waves-effect waves-light">
                                Pay Now
                                <i className="material-icons right">local_grocery_store</i>
                            </button>
                        </StripeCheckout>
                        {status === 1 ? <p className="flow-text" style={{color: 'red'}}>Transaction failed! Please try again!</p> : <></>}
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
        } else if (status === 2) {
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
                <meta name="description" content="Complete the payment process so that we can get started with your project!" />
                <meta name="keywords" content="payment, pay, osbornai, checkout, money, buy, order" />
                <meta name="author" content="OsbornAI" />
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            {render()}
        </div>
    );
};

// export async function getStaticPaths() {
//     try {
//         const payment_ids_response = await axios.post('https://osbornai-backend.herokuapp.com/view_valid_payment_ids');
//         const payment_ids = payment_ids_response.data.payment_ids;

//         const paths = payment_ids.map(payment_id => ({
//             params: {
//                 slug: payment_id
//             }
//         }));

//         return {
//             paths,
//             fallback: false
//         };
//     } catch {
//         const paths = [];

//         return {
//             paths,
//             fallback: false
//         };
//     }
// };

// export async function getStaticProps({ params: { slug } }) {
//     try {
//         const payment_id_details_response = await axios.post('https://osbornai-backend.herokuapp.com/load_payment_id', { payment_id: slug });
//         const payment_id_details = payment_id_details_response.data.payment_id_info;
        
//         return { props: { payment_id_details: payment_id_details } };

//     } catch {
//         return { props: { payment_id_details: null } };
//     }
// };