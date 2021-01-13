from flask import Flask, jsonify, request
import stripe
import os

app = Flask(__name__)

stripe.api_key = os.getenv('STRIPE_SECRET')

@app.route('/pay/:pay_token', methods=['POST'], strict_slashes=False)
def pay():
    # This is where we will get the pay request information sent by the token which will contain the amount, the type of item and such
    amount = None

    form_json = request.get_json()
    email = form_json['email']

    # Add more information here - Description to be echoed back to the user
    intent = stripe.PaymentIntent.create(
        amount=amount * 100,
        currency='aud',
        receipt_email=email
    )

    return jsonify({'client_secret': intent['client_secret']})

# Add this webhook once the app has been deployed
@app.route('/payment_webook', methods=['POST'], strict_slashes=False)
def paymentWebhook():
    event = request.get_json()

    if event['type'] == 'payment_intent.succeeded':
        user_email = event['data']['object']['receipt_email']

        # This callback will also add the user to the paid database somehow on confirmation

        # Send an email here then return success
        # Send a custom email template

        return jsonify({'success': 1})

    else:
        return jsonify({'success': 0})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)