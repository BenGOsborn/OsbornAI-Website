import { useState, useEffect } from 'react';
import '../form.css';
import axios from 'axios';
import FormData from 'form-data';

const Book = () => {
    const [daysSince, setDaysSince] = useState(Infinity);

    const [first, setFirst] = useState(null);
    const [last, setLast] = useState(null);
    const [email, setEmail] = useState(null);
    const [inquiry, setInquiry] = useState(null);

    const getDaysSince = (last_inquiry_raw) => {
        const current_date = new Date().getTime();
        const last_inquiry = new Date(last_inquiry_raw);
        const days_since = parseInt((current_date - last_inquiry) / 8.64e7);

        return days_since;
    };

    useEffect(() => {
        const prev_inquiry_date = localStorage.getItem('prev_inquiry_date');

        if (prev_inquiry_date === null) {
            setDaysSince(10);
        } else {
            const days_since = getDaysSince(prev_inquiry_date);
            setDaysSince(days_since);
        }
    }, []);

    const sendInquiry = (e) => {
        e.preventDefault();

        let form = new FormData();
        form.append('first', first);
        form.append('last', last);
        form.append('email', email);
        form.append('inquiry', inquiry);

        axios.post("https://osbornai.herokuapp.com/add_inquiry", form)
        .then(res => {
            const form = res.data;

            const prev_inquiry_date = form.prev_inquiry_date;
            localStorage.setItem('prev_inquiry_date', prev_inquiry_date);

            const days_since = getDaysSince(prev_inquiry_date);
            setDaysSince(days_since);
        })
        .catch((err) => {
            const form = err.response.data;

            if (parseInt(form.error_code) === 25) {
                const prev_inquiry_date = form.prev_inquiry_date;
                localStorage.setItem('prev_inquiry_date', prev_inquiry_date);

                const days_since = getDaysSince(prev_inquiry_date);
                setDaysSince(days_since);
            } else {
                console.log(`Error code ${form.error_code}: '${form.error}'`);
                setDaysSince(Infinity);
            }
            
            e.target.reset();
        });
    }; 

    const isDisplayed = () => {
        if (daysSince < 10) {
            return (
                <div className="Displayed">
                    <div class="container">
                        <br />
                        <p style={{color: '#1E88E5', fontWeight: 'bold'}} class="flow-text">
                            We'll contact you shortly! You may reinquire in {10 - daysSince} days.
                        </p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Displayed">
                    <form onSubmit={sendInquiry} id="sendForm">
                        <div class="input-field">
                            <input type="text" placeholder="First" name="first" required={true} onChange={(e) => {setFirst(e.target.value)}} />
                            <input type="text" placeholder="Last" name="last" required={true} onChange={(e) => {setLast(e.target.value)}} />
                            <input type="email" placeholder="Email" name="email" required={true} onChange={(e) => {setEmail(e.target.value)}} />
                            <textarea class="materialize-textarea" id="inquiry" placeholder="Inquiry" name="inquiry" required={true} minLength="10" maxLength="300" onChange={(e) => {setInquiry(e.target.value)}} />
                        </div>
                    </form>
                    <button class="btn blue darken-1 waves-effect waves-light" type="submit" form="sendForm">
                        Send
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="Book">
            <div class="container">
                <br />
                <br />
                <b>
                    <p style={{fontSize: 23}}>
                        Ready to take the next step for your business?
                    </p>
                </b>
                <p style={{fontSize: 18}}>
                    Inquire about a consult below so we can get started. We look forward to working with you!
                </p>
                {isDisplayed()}
                <br />
                <br />
            </div>
        </div>
    );
};

export default Book;