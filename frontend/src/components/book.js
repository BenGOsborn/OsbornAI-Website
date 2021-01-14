import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../pages/form.css';

const hookStyle = {
    fontSize: 23
};

const followUpStyle = {
    fontSize: 18
};

const Book = () => {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const cdDateRaw = localStorage.getItem('Cooldown');
        const cdDate = JSON.parse(cdDateRaw);

        if (cdDate === null) {
            setDisplay(0);

        // Instead of reading a token we will make an axios request to the server to determine if it is ok to make a reuqest then
        // This means we will need some sort of loading state which will allow us to display loading intead
        } else {
            const curDate = new Date().getTime();
            if (curDate >= cdDate) {
                setDisplay(0);
            } else {
                setDisplay(1);
            }
        }

    }, []);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_cxarmib', 'template-main-id', e.target, 'user_y82ZwKg2eIg9LO4L0jaRq')
        .then((result) => {
            window.M.toast({html: 'Inquiry sent!', displayLength: 5000});
            localStorage.setItem('Cooldown', JSON.stringify(new Date().getTime() + 10 * 8.64e7)); // This should actually be a date in the future
            setDisplay(1);

        }, (error) => {
            window.M.toast({html: 'Inquiry failed, please try again!', displayLength: 50000});
            setDisplay(0);

        });
    };

    const isDisplayed = () => {
        if (display === 0) {
            return (
                <div className="Displayed">
                    <form onSubmit={sendEmail} id="sendForm">
                        <div class="input-field">
                            <input type="text" placeholder="First" name="first" required={true} />
                            <input type="text" placeholder="Last" name="last" required={true} />
                            <input type="email" placeholder="Email" name="email" required={true} />
                            <input type="tel" placeholder="Phone" name="phone" required={true} />
                            <textarea class="materialize-textarea" id="inquiry" placeholder="Inquiry" name="inquiry" required={true} minLength="10" maxLength="300" />
                        </div>
                    </form>

                    <button class="btn blue darken-1 waves-effect waves-light" type="submit" form="sendForm">Send
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
                            We'll contact you shortly! You may reinquire in {parseInt((JSON.parse(localStorage.getItem('Cooldown')) - new Date().getTime()) / 8.64e7) + 1} days.
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
                <p style={hookStyle}>
                    Ready to take the next step for your business?
                </p>
            </b>
            <p style={followUpStyle}>
                Inquire about a consult below so we can get started. We look forward to working with you!
            </p>
            {isDisplayed()}
            <br />
            <br />
        </div>
    );
};

export default Book;