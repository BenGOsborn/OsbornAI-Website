from flask import Flask, jsonify, request
from flask_cors import CORS
import stripe
import os
from database import Database, ErrorCodes
import json
import jwt
from datetime import datetime, timedelta
import dotenv
from functools import wraps
import traceback

dotenv.load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['DB'] = Database()

stripe.api_key = os.getenv('STRIPE_SECRET')

# -------------------------- Helper Functions ---------------------------

def sanitizeJSON(json_raw):
    return json.loads(json.dumps(json_raw, default=str))

# -------------------------- Admin auth -------------------------------

@app.route('/admin/login', methods=['POST'], strict_slashes=False)
def login():
    try:
        form_json = request.json

        username = form_json['username']
        password = form_json['password']

        success = app.config['DB'].admin_login(username, password)

        if not success['success']:
            return jsonify({'success': False, 'token': None, 'error_code': success['error_code'], 'error': success['error']}), 400

        token = jwt.encode({'username': username, 'exp': datetime.utcnow() + timedelta(days=1)}, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'success': True, 'token': token}), 200

    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'token': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

def checkToken(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            form_json = request.json

            token = form_json['token']

        except:
            err = traceback.format_exc()
            print(err)
            return jsonify({'success': False, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400
                
        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        
        except:
            err = traceback.format_exc()
            print(err)
            return jsonify({'success': False, 'error_code': ErrorCodes.error_code_token, 'error': err}), 400
        
        return f(*args, **kwargs)
    
    return decorated

@app.route('/admin/validate_token', methods=['POST'], strict_slashes=False)
@checkToken
def validateToken():
    try:
        return jsonify({'success': True}), 200
    
    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

# -------------------------- Payment routes -----------------------------

@app.route('/load_payment_id', methods=['POST'], strict_slashes=False)
def validateId():
    try:
        form_json = request.json

        payment_id = form_json['payment_id']

        success = app.config['DB'].view_payment_id_details(payment_id)

        if not success['success']:
            return jsonify({'success': False, 'payment_id_info': sanitizeJSON(success['payment_id_info']), 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True, 'payment_id_info': sanitizeJSON(success['payment_id_info'])}), 200

    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'payment_id_info': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@app.route('/view_valid_payment_ids', methods=['POST'], strict_slashes=False)
def viewValidPaymentIds():
    try:
        success = app.config['DB'].view_payment_ids()

        if not success['success']:
            return jsonify({'success': False, 'payment_ids': sanitizeJSON(success['payment_ids']), 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True, 'payment_ids': sanitizeJSON(success['payment_ids'])}), 200
    
    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'payment_ids': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@app.route('/admin/view_valid_payment_ids', methods=['POST'], strict_slashes=False)
@checkToken
def adminViewValidPaymentIds():
    try:
        success = app.config['DB'].admin_view_payment_ids()

        if not success['success']:
            return jsonify({'success': False, 'payment_ids': sanitizeJSON(success['payment_ids']), 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True, 'payment_ids': sanitizeJSON(success['payment_ids'])}), 200
    
    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'payment_ids': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@app.route('/admin/create_payment_id', methods=['POST'], strict_slashes=False)
@checkToken
def createPaymentId():
    try:
        form_json = request.json

        purchase = form_json['purchase']
        amount = form_json['amount']
        currency = form_json['currency']

        success = app.config['DB'].admin_create_payment_id(purchase, amount, currency)

        if not success['success']:
            return jsonify({'success': False, 'payment_details': sanitizeJSON(success['payment_details']), 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True, 'payment_details': sanitizeJSON(success['payment_details'])}), 200

    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'payment_details': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@app.route('/pay', methods=['POST'], strict_slashes=False)
def pay():
    payment_success = False

    try:
        form_json = request.json

        payment_token_json = form_json['token']
        payment_id = form_json['payment_id']

        success = app.config['DB'].view_payment_id_details(payment_id)
        if not success['success']:
            return jsonify({'success': False, 'payment_success': payment_success, 'error_code': success['error_code'], 'error': success['error']}), 400
        
        payment_token = json.loads(payment_token_json)
        payment_id_info = success['payment_id_info']

        amount = payment_id_info['amount'] * 100
        description = payment_id_info['purchase']
        currency = payment_id_info['currency']
        receipt_email = payment_token['card']['name']
        source = payment_token['id']

        customer = stripe.Customer.create(
            email=receipt_email,
            source=source
        )

        charge = stripe.Charge.create(
            amount=int(amount),
            customer=customer,
            description=description,
            currency=currency,
            receipt_email=receipt_email
        )

        payment_success = True

        success = app.config['DB'].add_payment(payment_id_info, payment_token, charge, customer)
        if not success['success']:
            return jsonify({'success': False, 'payment_success': payment_success, 'error_code': success['error_code'], 'error': success['error']}), 400

        success = app.config['DB'].admin_delete_payment_id(payment_id)
        if not success['success']:
            return jsonify({'success': False, 'payment_success': payment_success, 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True, 'payment_success': payment_success}), 200

    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'payment_success': payment_success, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@app.route('/admin/view_payments', methods=['POST'], strict_slashes=False)
@checkToken
def viewPayments():
    try:
        success = app.config['DB'].admin_view_payments()

        if not success['success']:
            return jsonify({'success': False, 'payments': sanitizeJSON(success['payments']), 'error_code': success['error_code'], 'error': success['error']}), 400
        
        return jsonify({'success': True, 'payments': sanitizeJSON(success['payments'])}), 200

    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'payments': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

# ------------------- Inquiry routes -----------------------

@app.route('/add_inquiry', methods=['POST'], strict_slashes=False)
def addInquiry():
    try:
        form_json = request.json

        first = form_json['first']
        last = form_json['last']
        email = form_json['email']
        inquiry = form_json['inquiry']

        success = app.config['DB'].add_inquiry(first, last, email, inquiry)

        if not success['success']:
            return jsonify({'success': False, 'prev_inquiry_date': sanitizeJSON(success['prev_inquiry_date']), 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True, 'prev_inquiry_date': sanitizeJSON(success['prev_inquiry_date'])}), 200

    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'prev_inquiry_date': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@app.route('/admin/view_inquiry_notifications', methods=['POST'], strict_slashes=False)
@checkToken
def viewInquiryNotifications():
    try:
        success = app.config['DB'].admin_view_inquiry_notifications()

        if not success['success']:
            return jsonify({'success': False, 'inquiry_notifications': sanitizeJSON(success['inquiry_notifications']), 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True, 'inquiry_notifications': sanitizeJSON(success['inquiry_notifications'])}), 200
    
    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'inquiry_notifications': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@app.route('/admin/delete_inquiry_notification', methods=['POST'], strict_slashes=False)
@checkToken
def deleteInquiryNotification():
    try:
        form_json = request.json

        inquiry_notification_id = form_json['inquiry_notification_id']

        success = app.config['DB'].admin_delete_inquiry_notification(inquiry_notification_id)
        
        if not success['success']:
            return jsonify({'success': False, 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': success}), 200
    
    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

if __name__ == '__main__':
    if 'DYNO' in os.environ:
        app.run()
    else:
        app.run(debug=True)