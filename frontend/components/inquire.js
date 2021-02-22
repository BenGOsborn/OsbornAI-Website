import React from 'react';
import axios from 'axios';
import { getDaysSince } from '../extras/helpers';

export default function Inquire(props) {
    const [daysSince, setDaysSince] = React.useState(Infinity);

    const [first, setFirst] = React.useState(null);
    const [last, setLast] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [inquiry, setInquiry] = React.useState(null);

    React.useEffect(() => {
        const prev_inquiry_date = localStorage.getItem('prev_inquiry_date');

        if (prev_inquiry_date) {
            setDaysSince(getDaysSince(prev_inquiry_date));
        }
    }, []);

    const sendInquiry = (e) => {
        e.preventDefault();

        axios.post("https://osbornai-backend.herokuapp.com/add_inquiry", { first: first, last: last, email: email, inquiry: inquiry })
        .then(res => {
            const form = res.data;

            const prev_inquiry_date = form.prev_inquiry_date;
            localStorage.setItem('prev_inquiry_date', prev_inquiry_date);

            const days_since = getDaysSince(prev_inquiry_date);
            setDaysSince(days_since);
        })
        .catch(err => {
            const form = err.response.data;

            const prev_inquiry_date = form.prev_inquiry_date;
            localStorage.setItem('prev_inquiry_date', prev_inquiry_date);

            const days_since = getDaysSince(prev_inquiry_date);
            setDaysSince(days_since);
        });
    }; 

    const isDisplayed = () => {
        if (daysSince < 10) {
            return (
                <div className="Displayed">
                    <div className="container">
                        <br />
                        <p style={{color: '#1E88E5', fontWeight: 'bold'}} className="flow-text">
                            We'll contact you shortly! You may reinquire in {10 - daysSince} days.
                        </p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Displayed">
                    <form onSubmit={sendInquiry} id="sendInquiry">
                        <div className="input-field">
                            <input type="text" placeholder="First" required={true} onChange={(e) => {setFirst(e.target.value)}} />
                            <input type="text" placeholder="Last" required={true} onChange={(e) => {setLast(e.target.value)}} />
                            <input type="email" placeholder="Email" required={true} onChange={(e) => {setEmail(e.target.value)}} />
                            <textarea className="materialize-textarea" placeholder="Inquiry" required={true} minLength="10" maxLength="300" onChange={(e) => {setInquiry(e.target.value)}} />
                        </div>
                    </form>
                    <button className="btn blue darken-1 waves-effect waves-light" type="submit" form="sendInquiry">
                        Send
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="Inquire">
            <div id="Inquire" className="container">
                <br />
                <br />
                <b>
                    <p style={{fontSize: 23}}>
                        Ready to learn what data can do for your business?
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