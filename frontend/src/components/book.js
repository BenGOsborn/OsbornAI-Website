import { useState, useEffect } from 'react';
import '../pages/form.css';
import axios from 'axios';

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
    const [daysSince, setDaysSince] = useState(0);

    const [first, setFirst] = useState(null);
    const [last, setLast] = useState(null);
    const [email, setEmail] = useState(null);
    const [inquiry, setInquiry] = useState(null);

    const getDaysSince = (last_inquiry_raw) => {
        const current_date = new Date().getTime();
        const last_inquiry = new Date(last_inquiry_raw);
        const days_since = parseInt((current_date - last_inquiry) / 8.64e7) + 1;

        return days_since;
    };

    useEffect(() => {
        const last_inquiry_raw = localStorage.getItem('last_inquiry');

        if (last_inquiry_raw === null) {
            setDaysSince(0);
        } else {
            const days_since = getDaysSince(last_inquiry_raw);
            setDaysSince(days_since);
        }
    }, []);

    const sendInquiry = (e) => {
        e.preventDefault();

        const data = {
            first: first, 
            last: last, 
            email: email, 
            inquiry: inquiry
        }

        axios.get("https://osbornai.herokuapp.com/add_inquiry", data)
        .then(res => {
            const form = res.data;

            const last_inquiry = form.last_inquiry;
            localStorage.setItem('last_inquiry', last_inquiry);

            const days_since = getDaysSince(last_inquiry);
            setDaysSince(days_since);
        })
        .catch((error) => {
            console.log("Error!");
            console.log(error.response);
        });

    }; 

    // Have this update on the display change
    const isDisplayed = () => {
        if (daysSince < 10) {
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
        } else {
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
        }
    };

    return (
        <div className="Book">
            <br />
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
    );
};

export default Book;