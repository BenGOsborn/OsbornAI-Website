from flask import Flask, jsonify, request
from flask_cors import CORS
import stripe
import os
from database import Database, ErrorCodes
import dotenv
from utils import *
from admin.admin_routes import admin

dotenv.load_dotenv()

app = Flask(__name__)
app.register_blueprint(admin)
CORS(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['DB'] = Database()

stripe.api_key = os.getenv('STRIPE_SECRET_TEST') if "DYNO" not in os.environ else os.getenv('STRIPE_SECRET')

@app.route('/load_payment_id', methods=['POST'], strict_slashes=False)
def loadPaymentId():
    try:
        form_json = request.json

        payment_id = form_json['payment_id']

        success = app.config['DB'].admin_view_payment_id_details(payment_id)

        if not success['success']:
            return jsonify({'success': False, 'payment_id_info': sanitizeJSON(success['payment_id_info']), 'error_code': success['error_code'], 'error': success['error']}), 400

        del success['payment_id_info']['identifier']

        return jsonify({'success': True, 'payment_id_info': sanitizeJSON(success['payment_id_info'])}), 200

    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'payment_id_info': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@app.route('/pay', methods=['POST'], strict_slashes=False)
def pay():
    payment_success = False

    try:
        form_json = request.json

        payment_token_json = form_json['token']
        payment_id = form_json['payment_id']

        success = app.config['DB'].admin_view_payment_id_details(payment_id)
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

if __name__ == '__main__':
    if 'DYNO' in os.environ:
        app.run()
    else:
        app.run(debug=True)