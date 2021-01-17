from flask import Flask, jsonify, request
from flask_cors import CORS
import stripe
import os
from database import Database
import json
import jwt
from datetime import datetime, timedelta
import dotenv
from functools import wraps

dotenv.load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

db = Database()

stripe.api_key = os.getenv('STRIPE_SECRET')

# -------------------------- Custom error codes -----------------

error_code_token = 24
error_code_failed = 25
error_code_other = 26

# -------------------------- Helper Functions ---------------------------

def sanitizeJSON(json_raw):
    return json.loads(json.dumps(json_raw, default=str))

# -------------------------- Admin auth -------------------------------

@app.route('/admin/login', methods=['POST'], strict_slashes=False)
def login():
    try:
        form_json = request.form

        username = form_json['username']
        password = form_json['password']

        success = db.admin_login(username, password)

        if not success:
            return jsonify({'success': False, 'error_code': error_code_failed, 'error': "Could not authenticate credentials!"}), 400

        token = jwt.encode({'username': username, 'exp': datetime.utcnow() + timedelta(days=1)}, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'success': True, 'token': token}), 200

    except Exception as e:
        return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400 # I could also send through the error code

def checkToken(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            form_json = request.form

            token = form_json['token']

        except Exception as e:
            return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400
                
        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        
        except Exception as e:
            return jsonify({'success': False, 'error_code': error_code_token, 'error': e}), 400
        
        return f(*args, **kwargs)
    
    return decorated

@app.route('/admin/validate_token', methods=['POST'], strict_slashes=False)
@checkToken
def validateToken():
    try:
        return jsonify({'success': True}), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400

# -------------------------- Payment routes -----------------------------

@app.route('/load_payment_id', methods=['POST'], strict_slashes=False)
def validateId():
    try:
        form_json = request.form

        payment_id = form_json['payment_id']

        payment_info = db.admin_view_payment_id_details(payment_id)
        if payment_info == None:
            return jsonify({'success': False, 'error_code': error_code_failed, 'error': f"Payment info for id '{payment_id}' does not exist!"}), 400

        return jsonify({**{'success': True}, **sanitizeJSON(payment_info)}), 200

    except Exception as e:
        return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400

@app.route('/admin/view_valid_payment_ids', methods=['POST'], strict_slashes=False)
@checkToken
def viewValidPaymentIds():
    try:
        ids = db.admin_view_payment_ids()

        return jsonify({'success': True, 'payment_ids': sanitizeJSON(ids)}), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400

@app.route('/admin/create_payment_id', methods=['POST'], strict_slashes=False)
@checkToken
def createPaymentId():
    try:
        form_json = request.form

        purchase = form_json['purchase']
        amount = float(form_json['amount'])
        currency = form_json['currency']

        valid_currencies = ['aud', 'usd']
        if currency not in valid_currencies:
            return jsonify({'success': False, 'error_code': error_code_failed, 'error': f"'{currency}' is not a valid currency!"}), 400

        if amount < 0:
            return jsonify({'success': False, 'error_code': error_code_failed, 'error': f"Amount must be greater than 0!"}), 400

        payment_id = db.admin_create_payment_id(purchase, amount, currency) # I want this to return the expiry date as well

        return jsonify({**{'success': True}, **sanitizeJSON(payment_id)}), 200

    except Exception as e:
        return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400

@app.route('/pay', methods=['POST'], strict_slashes=False) # Untested
def pay():
    # Maybe I should have an option for processing payments of 0
    try:
        form_json = request.form

        first = form_json['first']
        last = form_json['last']
        email = form_json['email']
        payment_id = form_json['payment_id']

        payment_info = db.admin_view_payment_id_details(payment_id)
        if payment_info == None:
            return jsonify({'success': False, 'error_code': error_code_failed, 'error': f"Payment id '{payment_id}' is invalid!"}), 400

        amount = payment_info['amount'] * 100
        currency = payment_info['currency']

        # I'll have to check to make sure stripe doesnt send strange receipts
        # I'll also have to make sure this information gets sent through properly
        desc_json = json.dumps({
            'payment_id': payment_id,
            'first': first,
            'last': last,
            'email': email,
            'purchase': payment_info['purchase'],
            'amount': amount,
            'currency': currency
        })

        intent = stripe.PaymentIntent.create(
            amount=amount,
            description=desc_json,
            currency=currency,
            receipt_email=email
        )

        return jsonify({'success': True, 'client_secret': intent['client_secret']}), 200

    except Exception as e:
        return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400

@app.route('/payment_webook', methods=['POST'], strict_slashes=False) # Untested
def paymentWebhook():
    try:
        form_json = request.form

        if form_json['type'] == 'payment_intent.succeeded':
            data_object = form_json['data']['object']
            receipt_info_json = data_object['description']
            receipt_info = json.loads(receipt_info_json)

            payment_id = receipt_info['payment_id']
            first = receipt_info['first']
            last = receipt_info['last']
            email = receipt_info['email']
            purchase = receipt_info['purchase']
            amount = receipt_info['amount']
            currency = receipt_info['currency']

            db.add_payment(first, last, email, payment_id, purchase, amount, currency)

            success = db.admin_delete_payment_id(payment_id) 
            if not success:
                return jsonify({'success': False, 'error_code': error_code_failed, 'error': f"Failed to delete id '{payment_id}' from the database!"}), 400

            return jsonify({'success': True}), 200

        else:
            # What will happen if this is false?

            return jsonify({'success': False, 'error_code': error_code_failed, 'error': "Payment did not succeed!"}), 400

    except Exception as e:
        return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400

# ------------------- Inquiry routes -----------------------

@app.route('/add_inquiry', methods=['POST'], strict_slashes=False)
def addInquiry():
    try:
        form_json = request.form

        first = form_json['first']
        last = form_json['last']
        email = form_json['email']
        inquiry = form_json['inquiry']

        success = db.add_inquiry(first, last, email, inquiry)

        if success != True:
            last_inquiry = success
            return jsonify({'success': False, 'last_inquiry': last_inquiry, 'error_code': error_code_failed, 'error': "Could not add inquiry!"}), 400

        return jsonify({'success': True, 'last_inquiry': datetime.utcnow()}), 200

    except Exception as e:
        return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400

@app.route('/admin/view_inquiry_notifications', methods=['POST'], strict_slashes=False)
@checkToken
def viewInquiryNotifications():
    try:
        inquiries = db.admin_view_inquiry_notifications()

        return jsonify({'success': True, 'inquiries': sanitizeJSON(inquiries)}), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400

@app.route('/admin/delete_inquiry_notification', methods=['POST'], strict_slashes=False)
@checkToken
def deleteInquiryNotification():
    try:
        form_json = request.form

        inquiry_notification_id = form_json['inquiry_notification_id']

        success = db.admin_delete_inquiry_notification(inquiry_notification_id)
        if not success:
            return jsonify({'success': False, 'error_code': error_code_failed, 'error': f"Could not delete inquiry with id '{inquiry_notification_id}'!"}), 400

        return jsonify({'success': success}), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error_code': error_code_other, 'error': e}), 400

if __name__ == '__main__':
    app.run()