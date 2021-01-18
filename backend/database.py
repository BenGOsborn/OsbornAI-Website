from pymongo import MongoClient
import json
from datetime import datetime, timedelta
import dotenv
import os
import hashlib
from bson import ObjectId

class ErrorCodes:
    error_code_token = 24
    error_code_failed = 25
    error_code_other = 26

# This will be responsible for creating the custom error responses that can then be sent back through the server
class Database:
    def __init__(self):
        dotenv.load_dotenv()

        mongo_username = os.getenv('MONGO_USERNAME')
        mongo_password = os.getenv('MONGO_PASSWORD')

        mongo_url = f"mongodb+srv://{mongo_username}:{mongo_password}@cluster-main.lh2ft.mongodb.net/main?retryWrites=true&w=majority"
        cluster = MongoClient(mongo_url)

        main = cluster['main']

        self.clients = main['clients']
        self.payments = main['payments']
        self.client_notifications = main['client_notifications']
        self.admin_auth = main['admin_auth']
        self.payment_ids = main['payment_ids']
        
        self.expires_in = 86400 * 7
        self.payment_ids.create_index("timeCreated", expireAfterSeconds=self.expires_in)

    def add_inquiry(self, first, last, email, inquiry):
        try:
            date = datetime.utcnow()

            prev_inquiries = self.clients.find({'email': email})

            # This has to be ordered from the top to the back though
            # I should rather sort it and then add it
            for prev_inquiry in prev_inquiries:
                prev_inquiry_date = prev_inquiry['inquiry_date']
                if (date - prev_inquiry_date) < 10:
                    return {'success': False, 'error_code': ErrorCodes.error_code_failed, 
                            'error': "Inquiry has already been made by the user within 10 days!", 'prev_inquiry_date': prev_inquiry_date}

            client_document = {
                'first': first,
                'last': last,
                'email': email,
                'inquiry': inquiry,
                'inquiry_date': date
            }

            self.clients.insert_one(client_document)

            prev_user_spendings = self.payments.find({'email': email})
            user_spent = sum(float(payment['amount']) for payment in prev_user_spendings)

            client_notification_document = {
                'first': first,
                'last': last,
                'email': email,
                'inquiry': inquiry,
                'inquiry_date': date,
                'prev_inquiries': prev_inquiries[::-1],
                'user_spent': user_spent
            }

            self.client_notifications.insert_one(client_notification_document)

            return {'success': True, 'prev_inquiry_date': date}

        except Exception as e:
            return {'success': False, 'error_code': ErrorCodes.error_code_other, 'error': e, 'prev_inquiry_date': None}

    def add_payment(self, first, last, email, payment_id, purchase, amount, currency):
        try:
            document = {
                'first': first,
                'last': last,
                'email': email,
                'payment_id': payment_id,
                'purchase_date': datetime.utcnow(),
                'purchase': purchase,
                'amount': float(amount),
                'currency': currency
            }

            self.payments.insert_one(document)

            return {'success': True} 
        
        except Exception as e:
            return {'success': False, 'error_code': ErrorCodes.error_code_other, 'error': e}

    def admin_view_inquiry_notifications(self):
        try:
            new_inquiries = self.client_notifications.find()

            return {'success': True, 'inquiry_notifications': list(new_inquiries)[::-1]}
        
        except Exception as e:
            return {'success': False, 'error_code': ErrorCodes.error_code_other, 'error': e}

    def admin_delete_inquiry_notification(self, inquiry_notification_id):
        try:
            self.client_notifications.delete_one({'_id': ObjectId(inquiry_notification_id)})

            return {'success': True}
        
        except Exception as e:
            return {'success': False, 'error_code': ErrorCodes.error_code_other, 'error': e}

    def admin_create_payment_id(self, purchase, amount, currency):
        try:
            document = {'purchase': purchase, 'amount': amount, 'currency': currency, 'timeCreated': datetime.utcnow(), 'expiry': datetime.utcnow() + timedelta(seconds=self.expires_in)}
            payment_id = self.payment_ids.insert_one(document)

            payment_details = {**{'payment_id': payment_id.inserted_id}, **document}

            return {'success': True, 'payment_details': payment_details}

        except Exception as e:
            return {'success': False, 'error_code': ErrorCodes.error_code_other, 'error': e}

    def admin_delete_payment_id(self, payment_id):
        try:
            self.payment_ids.delete_one({'_id': ObjectId(payment_id)})

            return {'success': True}
        
        except Exception as e:
            return {'success': False, 'error_code': ErrorCodes.error_code_other, 'error': e}

    def admin_view_payment_ids(self):
        try:
            payment_ids = self.payment_ids.find()

            return {'success': True, 'payment_ids': list(payment_ids)[::-1]}
        
        except Exception as e:
            return {'success': False, 'error_code': ErrorCodes.error_code_other, 'error': e}

    def admin_view_payment_id_details(self, payment_id):
        try:
            payment_id_info = self.payment_ids.find_one({'_id': ObjectId(payment_id)})

            return {'success': True, 'payment_id_info': payment_id_info}
        
        except Exception as e:
            return {'success': False, 'error_code': ErrorCodes.error_code_other, 'error': e}

    def admin_login(self, username, password):
        try:
            salt = "oTaLtzyE2SvGIzGXnDqmGzdBpz0DP3xQROY0W5t4sKdTdX5PIg"
            user_info = self.admin_auth.find_one({'username': username})

            if user_info == None:
                return {'success': False, 'error_code': ErrorCodes.error_code_failed, 'error': "Authentication failed!"} 
            
            hashed_password = hashlib.sha512((password+salt).encode('utf-8')).hexdigest()
            if hashed_password == user_info['password']:
                return {'success': True}
            
            return {'success': False, 'error_code': ErrorCodes.error_code_failed, 'error': "Authentication failed!"}

        except Exception as e:
            return {'success': False, 'error_code': ErrorCodes.error_code_other, 'error': e}