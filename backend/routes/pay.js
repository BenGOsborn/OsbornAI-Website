const express = require('express');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const router = express.Router()

router.post('/', (req, res) => {
    try {
        const { product, token } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuidv4();
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: 'aud',
            customer: customer.id,
            receipt_email: token.email,
        },
        {
            idempotency_key
        });
        const status = 1;
        const error = null;

    } catch (e) {
        const status = 0;
        const error = e;
    };

    res.json({
        'status': status,
        'error': error
    });
});

module.exports = router;