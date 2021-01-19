import { useState, useEffect } from 'react';
import FormData from 'form-data';
import axios from 'axios';
import PayNotFound from './pay-not-found';
import StripeCheckout from 'react-stripe-checkout';

const Pay = (props) => {
    const [paymentDetails, setPaymentDetails] = useState({});
    const [render, setRender] = useState(0); // 0 = Loading, 1 = Bad display, 2 = Display ID, 3 = Bad payment, 4 = Payment success 

    useEffect(() => {
        setRender(0);

        const payment_id = props.match.params.payment_id;

        const pay_form = new FormData();
        pay_form.append('payment_id', payment_id);

        axios.post('https://osbornai.herokuapp.com/load_payment_id', pay_form)
        .then((res) => {
            const form = res.data;

            setPaymentDetails(form);
            setRender(2);
        })
        .catch((err) => {
            const form = err.response.data;

            if (parseInt(form.error_code) === 25) {
                setRender(1);
            } else {
                console.log(`Error code ${form.error_code}: '${form.error}'`);
                setRender(1);
            }
        });
    }, [props.match.params.payment_id]);

    const handleToken = (token) => {
        const payment_form = new FormData();
        payment_form.append('token', token);
        payment_form.append('payment_id', paymentDetails._id);

        axios.post('https://osbornai.herokuapp.com/pay', payment_form)
        .then((res) => {
            const form = res.data;

            setRender(4);
        })
        .catch((err) => {
            const form = err.response.data;

            if (form.payment_success === true) {
                setRender(4);
            } else {
                console.log(`Error code ${form.error_code}: '${form.error}'`);
                setRender(3);
            }
        });
    };

    const isDisplayed = () => {
        if (render === 0) {
            return (
                <div class="container center">
                    <h4 style={{color: '#039be5'}}>Loading...</h4>
                </div>
            );
        } else if (render === 2 || render === 3) {
            return (
                <div class="container center" style={{fontSize: 18}}>
                    <div class="container">
                        <h4>Purchase Information:</h4>
                        <br />
                        <div class="container">
                            <b>Payment ID:</b> 
                            <br />
                            {paymentDetails._id}
                            <br />
                            <b>Name:</b>
                            <br />
                            {paymentDetails.name}
                            <br />
                            <b>Purchase:</b> 
                            <div style={{whiteSpace: 'pre-line'}}>
                                {paymentDetails.purchase}
                            </div>
                            <b>Amount:</b> 
                            <br />
                            ${paymentDetails.amount} {paymentDetails.currency.toUpperCase()}
                        </div>
                    </div>
                    <br />
                    {/* This is the TEST Stripe key */}
                    {/* Investigate Stripe console errors */}
                    <StripeCheckout stripeKey="pk_test_51I8LX2C7YoItP8TeLj1WrEorqgKQ333kNQZSAypFzpN51gl16F82gS7p3P7O0ZbiYN1qUcg2z3MjtHdFQ29j48So00dlT7UlYc" 
                        name={paymentDetails.name}
                        description={paymentDetails.purchase}
                        amount={paymentDetails.amount * 100}
                        currency={paymentDetails.currency.toUpperCase()}
                        token={handleToken}
                    >
                        <button class="btn blue darken-1 waves-effect waves-light">
                            Pay Now
                            <i class="material-icons right">local_grocery_store</i>
                        </button>
                    </StripeCheckout>
                    <br />
                    {render === 3 ?
                    <h5 style={{color: 'red'}}>
                        Transaction failed! Please try again!
                    </h5>
                    :null}
                </div>
            );
        } else if (render === 4) {
            return (
                <div class="container center">
                    <h4 style={{color: "1E88E5"}}>Payment succeeded!</h4>
                </div>
            );
        } else {
            return (
                <>
                    <PayNotFound />
                </>
            );
        }
    };

    return (
        <div className="Pay">
            {isDisplayed()}
        </div>
    );
};

export default Pay;