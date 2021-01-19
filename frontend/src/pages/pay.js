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
                setRender(1);
            }
        });
    }, [props.match.params.payment_id]);

    const handleToken = (token) => {
        const payment_form = new FormData();
        payment_form.append('token', JSON.stringify(token));
        payment_form.append('payment_id', paymentDetails._id);

        axios.post('https://osbornai.herokuapp.com/pay', payment_form)
        .then((res) => {
            setRender(4);
        })
        .catch((err) => {
            const form = err.response.data;

            if (form.payment_success === true) {
                setRender(4);
            } else {
                setRender(3);
            }
        });
    };

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
        } else if (render === 2 || render === 3) {
            return (
                <div class="container center" style={{fontSize: 18}}>
                    <div class="container">
                        <br />
                        <br />
                        <br />
                        <br />
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
                    <StripeCheckout stripeKey="pk_live_51I8LX2C7YoItP8TecbnnNAlWuANCjN2bQBfUpdu9yoaYwLoNrVZ480oNqCQyOlZSfNPxeb0GemzaQBSSVLG6pX9w00gPrfeZeS" 
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
        } else if (render === 4) {
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
                    <br />
                    <br />
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
            <br />
            {isDisplayed()}
            <br />
            <br />
        </div>
    );
};

export default Pay;