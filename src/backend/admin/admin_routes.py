from flask import Blueprint, request, jsonify, current_app
from datetime import datetime, timedelta
import traceback
import jwt
from database import ErrorCodes
from utils import checkToken, sanitizeJSON

admin = Blueprint("admin", __name__)

@admin.route('/login', methods=['POST'], strict_slashes=False)
def login():
    try:
        form_json = request.json

        username = form_json['username']
        password = form_json['password']

        success = current_app.config['DB'].admin_login(username, password)

        if not success['success']:
            return jsonify({'success': False, 'token': None, 'error_code': success['error_code'], 'error': success['error']}), 400

        token = jwt.encode({'username': username, 'exp': datetime.utcnow() + timedelta(days=1)}, current_app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'success': True, 'token': token}), 200

    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'token': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@admin.route('/validate_token', methods=['POST'], strict_slashes=False)
@checkToken
def validateToken():
    try:
        return jsonify({'success': True}), 200
    
    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@admin.route('/view_valid_payment_ids', methods=['POST'], strict_slashes=False)
@checkToken
def viewValidPaymentIds():
    try:
        success = current_app.config['DB'].admin_view_payment_ids()

        if not success['success']:
            return jsonify({'success': False, 'payment_ids': sanitizeJSON(success['payment_ids']), 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True, 'payment_ids': sanitizeJSON(success['payment_ids'])}), 200
    
    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'payment_ids': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@admin.route('/create_payment_id', methods=['POST'], strict_slashes=False)
@checkToken
def createPaymentId():
    try:
        form_json = request.json

        identifier = form_json['identifier']
        purchase = form_json['purchase']
        amount = form_json['amount']
        currency = form_json['currency']

        success = current_app.config['DB'].admin_create_payment_id(identifier, purchase, amount, currency)

        if not success['success']:
            return jsonify({'success': False, 'payment_details': sanitizeJSON(success['payment_details']), 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True, 'payment_details': sanitizeJSON(success['payment_details'])}), 200

    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'payment_details': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@admin.route('/view_payments', methods=['POST'], strict_slashes=False)
@checkToken
def viewPayments():
    try:
        success = current_app.config['DB'].admin_view_payments()

        if not success['success']:
            return jsonify({'success': False, 'payments': sanitizeJSON(success['payments']), 'error_code': success['error_code'], 'error': success['error']}), 400
        
        return jsonify({'success': True, 'payments': sanitizeJSON(success['payments'])}), 200

    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'payments': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@admin.route('/delete_payment_id', methods=['POST'], strict_slashes=False)
@checkToken
def deletePaymentId():
    try:
        form_json = request.json

        payment_id = form_json['payment_id']

        success = current_app.config['DB'].admin_delete_payment_id(payment_id)
        if not success['success']:
            return jsonify({'success': False, 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True}), 200
    
    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@admin.route('/admin/view_inquiry_notifications', methods=['POST'], strict_slashes=False)
@checkToken
def viewInquiryNotifications():
    try:
        success = current_app.config['DB'].admin_view_inquiry_notifications()

        if not success['success']:
            return jsonify({'success': False, 'inquiry_notifications': sanitizeJSON(success['inquiry_notifications']), 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': True, 'inquiry_notifications': sanitizeJSON(success['inquiry_notifications'])}), 200
    
    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'inquiry_notifications': None, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400

@admin.route('/admin/delete_inquiry_notification', methods=['POST'], strict_slashes=False)
@checkToken
def deleteInquiryNotification():
    try:
        form_json = request.json

        inquiry_notification_id = form_json['inquiry_notification_id']

        success = current_app.config['DB'].admin_delete_inquiry_notification(inquiry_notification_id)
        
        if not success['success']:
            return jsonify({'success': False, 'error_code': success['error_code'], 'error': success['error']}), 400

        return jsonify({'success': success}), 200
    
    except:
        err = traceback.format_exc()
        print(err)
        return jsonify({'success': False, 'error_code': ErrorCodes.error_code_other, 'error': err}), 400