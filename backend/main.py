from flask import Flask, jsonify, request
import stripe
import os
from database import Database

app = Flask(__name__)

db = Database()

stripe.api_key = os.getenv('STRIPE_SECRET')

# -------------------------- Payment routes -----------------------------

@app.route('/validate_payment_id', methods=['POST'], strict_slashes=False)
def validateId():
    form_json = request.get_json()
    payment_id = form_json['payment_id']

    payment_info = db.admin_view_payment_id_details(payment_id)
    if payment_info == False:
        return jsonify({'success': False})

    return jsonify({'success': True})

@app.route('/pay', methods=['POST'], strict_slashes=False)
def pay():
    form_json = request.get_json()
    email = form_json['email']
    payment_id = form_json['payment_id']

    payment_info = db.admin_view_payment_id_details(payment_id)
    if payment_info == False:
        return jsonify({'success': False})

    amount = payment_info['amount'] * 100
    purchase = payment_info['purchase']

    intent = stripe.PaymentIntent.create(
        amount=amount * 100,
        description=purchase,
        currency='aud',
        receipt_email=email
    )

    return jsonify({'success': True, 'client_secret': intent['client_secret']})

@app.route('/payment_webook', methods=['POST'], strict_slashes=False)
def paymentWebhook():
    form_json = request.get_json()

    if form_json['type'] == 'payment_intent.succeeded':
        user_email = form_json['data']['object']['receipt_email']

        # This callback will also add the user to the paid database somehow on confirmation

        # Send an email here then return success
        # Send a custom email template

        # I need to find a way to create some sort of receipt which can then be emailed with HTML - this is the web callback

        return jsonify({'success': True})

    else:
        return jsonify({'success': False})

# ------------------- Inquiry routes -----------------------

@app.route('/add_inquiry', methods=['POST'], strict_slashes=False)
def addInquiry():
    form_json = request.json()

    first = form_json['first']
    last = form_json['last']
    email = form_json['email']
    inquiry = form_json['inquiry']

    success = db.add_inquiry(first, last, email, inquiry)

    return jsonify({'success': success})

@app.route('/view_inquiry_notifications', methods=['POST'], strict_slashes=False)
def viewInquiryNotifications():
    inquiries = db.admin_view_inquiry_notifications()

    if inquiries == False:
        return jsonify({'success': False})

    return jsonify({'success': True, 'inquiries': inquiries})

@app.route('/delete_inquiry_notification', methods=['POST'], strict_slashes=False)
def deleteInquiryNotification():
    form_json = request.get_json()

    inquiry_notification_id = form_json['inquiry_notification_id'] # This will come from the '_id'

    success = db.admin_delete_inquiry_notification(inquiry_notification_id)

    return jsonify({'success': success})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)