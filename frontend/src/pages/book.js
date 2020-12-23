import emailjs from 'emailjs-com';
import './form.css';

const Book = () => {
    const hookStyle = {
        fontSize: 23
    };

    const followUpStyle = {
        fontSize: 18
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_cxarmib', 'template-main-id', e.target, 'user_y82ZwKg2eIg9LO4L0jaRq')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
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
                Inquire about a consult below so we can get started.
            </p>

            {/* Have a cookie here that acts as a line of defense against people that have already inquired */}

            <form onSubmit={sendEmail} id="sendForm">
                <div class="input-field">
                    <input type="text" placeholder="First" name="first" required={true} />
                    <input type="text" placeholder="Last" name="last" required={true} />
                    <input type="email" placeholder="Email" name="email" required={true} />
                    <input type="tel" placeholder="Phone" name="phone" required={true} />
                    <textarea class="materialize-textarea" id="inquiry" placeholder="Inquiry" name="inquiry" required={true} minLength="10" maxLength="300" />
                </div>
            </form>

            <button class="btn blue darken-1 waves-effect waves-light" type="submit" name="action" form="sendForm">Send
                <i class="material-icons right">send</i>
            </button>

            <br />
            <br />

        </div>
    );
}

export default Book;