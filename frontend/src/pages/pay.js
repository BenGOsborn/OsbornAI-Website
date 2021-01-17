import { useState, useEffect } from 'react';
import FormData from 'form-data';
import axios from 'axios';
import PayNotFound from './pay-not-found';

const Pay = (props) => {
    const [paymentDetails, setPaymentDetails] = useState({});
    const [render, setRender] = useState(0); // 0 = Bad display, 1 = Display ID

    useEffect(() => {
        const payment_id = props.match.params.payment_id;

        const pay_form = new FormData();
        pay_form.append('payment_id', payment_id);

        axios.post('https://osbornai.herokuapp.com/load_payment_id', pay_form)
        .then((res) => {
            const form = res.data;

            setPaymentDetails(form);
            setRender(1);
        })
        .catch((err) => {
            const form = err.response.data;

            if (parseInt(form.error_code) === 25) {
                setRender(0);
            } else {
                console.log(`Error code ${form.error_code}: '${form.error}'`);
                setRender(0);
            }
        });
    }, []);

    const isDisplayed = () => {
        // We will now determine to display whether the error or not
        if (render === 0) {
            return (
                <>
                    <PayNotFound />
                </>
            );
        } else {

        }
    };

    return (
        <div className="Pay">

        </div>
    );
};

export default Pay;