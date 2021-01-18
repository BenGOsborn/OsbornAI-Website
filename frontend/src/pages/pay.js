import { useState, useEffect } from 'react';
import FormData from 'form-data';
import axios from 'axios';
import PayNotFound from './pay-not-found';

const Pay = (props) => {
    const [paymentDetails, setPaymentDetails] = useState({});
    const [render, setRender] = useState(0); // 0 = Loading, 1 = Bad display, 2 = Display ID

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

    const isDisplayed = () => {
        if (render === 0) {
            return (
                <div class="container center">
                    <h4 style={{color: '#039be5'}}>Loading...</h4>
                </div>
            );
        } else if (render === 1) {
            return (
                <>
                    <PayNotFound />
                </>
            );
        } else {
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
                    <div class="container">
                        <h4>Your Details:</h4>
                    </div>
                </div>
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