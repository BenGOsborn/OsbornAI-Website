import emailjs from 'emailjs-com';

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

            {/* How do I make the highlighting blue? */}
            {/* Have a cookie here that acts as a line of defense against people that have already inquired */}
            <form onSubmit={sendEmail}>
                <input type="text" placeholder="First" name="first" required={true} />
                <input type="text" placeholder="Last" name="last" required={true} />
                <input type="email" placeholder="Email" name="email" required={true} />
                <input type="tel" placeholder="Phone" name="phone" required={true} />
                <textarea class="materialize-textarea" placeholder="Inquiry" name="inquiry" required={true} minLength="10" maxLength="300" />
                <input class="btn waves-effect waves-light" type="submit" value="Send" />
            </form>

            <br />

        </div>
    );
}

export default Book;