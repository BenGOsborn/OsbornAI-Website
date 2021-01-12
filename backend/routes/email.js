const e = require('express');
const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router()


router.post('/', (req, res) => {
    const transposer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    try {
        const { first, last, email, phone, inquiry } = req.body;

        const mail_options = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Inquiry from ${first} ${last} - OsbornAI`,
            text: 
            `First: ${first}
            Last: ${last}
            Email: ${email}
            Phone: ${phone}
            Inquiry: ${inquiry}`
        };

        transposer.sendMail(mail_options, (err, data) => {
            if (err) {
                throw e;
            }
        });

        // Now I need to have a way of updating the database as well as making sure it doesnt get updated if the server breaks

        const status = 1;
        const error = null;

    } catch (e) {
        const status = 0;
        const error = e;
    }

    res.json({
        'status': status,
        'error': error
    });
});