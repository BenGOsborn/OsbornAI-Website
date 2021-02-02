import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default function Book(props) {
    const [daysSince, setDaysSince] = React.useState(Infinity);

    const [first, setFirst] = React.useState(null);
    const [last, setLast] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [inquiry, setInquiry] = React.useState(null);

    const getDaysSince = (last_inquiry_raw) => {
        const current_date = new Date().getTime();
        const last_inquiry = new Date(last_inquiry_raw);
        const days_since = parseInt((current_date - last_inquiry) / 8.64e7);

        return days_since;
    };

    React.useEffect(() => {
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

            if (form.error_code === 25) {
                const prev_inquiry_date = form.prev_inquiry_date;
                localStorage.setItem('prev_inquiry_date', prev_inquiry_date);

                const days_since = getDaysSince(prev_inquiry_date);
                setDaysSince(days_since);
            } else {
                setDaysSince(Infinity);
            }
            
            e.target.reset();
        });
    }; 

    const isDisplayed = () => {
        if (daysSince < 10) {
            return (
                <div className="Displayed">
                    <div className="container">
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
                        <div className="input-field">
                            <input type="text" placeholder="First" name="first" required={true} onChange={(e) => {setFirst(e.target.value)}} />
                            <input type="text" placeholder="Last" name="last" required={true} onChange={(e) => {setLast(e.target.value)}} />
                            <input type="email" placeholder="Email" name="email" required={true} onChange={(e) => {setEmail(e.target.value)}} />
                            <textarea className="materialize-textarea" id="inquiry" placeholder="Inquiry" name="inquiry" required={true} minLength="10" maxLength="300" onChange={(e) => {setInquiry(e.target.value)}} />
                        </div>
                    </form>
                    <button className="btn blue darken-1 waves-effect waves-light" type="submit" form="sendForm">
                        Send
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="Book">
            <div id="Book" className="container">
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
}