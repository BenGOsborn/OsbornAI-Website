import { useState, useEffect } from 'react';
import '../form.css';
import axios from 'axios';
import FormData from 'form-data';

// const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm('service_cxarmib', 'template-main-id', e.target, 'user_y82ZwKg2eIg9LO4L0jaRq')
//     .then((result) => {
//         window.M.toast({html: 'Inquiry sent!', displayLength: 5000});
//         localStorage.setItem('Cooldown', JSON.stringify(new Date().getTime() + 10 * 8.64e7)); // This should actually be a date in the future
//         setDisplay(1);

//     }, (error) => {
//         window.M.toast({html: 'Inquiry failed, please try again!', displayLength: 5000});
//         setDisplay(0);

//     });
// };

const Book = () => {
    const [daysSince, setDaysSince] = useState(10);

    const [first, setFirst] = useState(null);
    const [last, setLast] = useState(null);
    const [email, setEmail] = useState(null);
    const [inquiry, setInquiry] = useState(null);

    const cooldown = 10;

    const getDaysSince = (last_inquiry_raw) => {
        const current_date = new Date().getTime();
        const last_inquiry = new Date(last_inquiry_raw);
        const days_since = parseInt((current_date - last_inquiry) / 8.64e7);

        return days_since;
    };

    useEffect(() => {
        const last_inquiry_raw = localStorage.getItem('last_inquiry');

        if (last_inquiry_raw === null) {
            setDaysSince(cooldown);
        } else {
            const days_since = getDaysSince(last_inquiry_raw);
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

            const last_inquiry = form.last_inquiry;
            localStorage.setItem('last_inquiry', last_inquiry);

            const days_since = getDaysSince(last_inquiry);
            setDaysSince(days_since);
        })
        .catch((error) => {
            console.error(error.response);
        });
    }; 

    const isDisplayed = () => {
        if (daysSince < cooldown) {
            return (
                <div className="Displayed">
                    <div class="container">
                        <br />
                        <p style={{color: '#1E88E5', fontWeight: 'bold'}} class="flow-text">
                            We'll contact you shortly! You may reinquire in {cooldown - daysSince} days.
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