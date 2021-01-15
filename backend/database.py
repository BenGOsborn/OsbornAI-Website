from pymongo import MongoClient
import json
from datetime import datetime, timedelta
import dotenv
import os
import hashlib
from bson import ObjectId

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
        date = datetime.utcnow()

        existing_user = self.clients.find_one({'email': email})

        paid_user = self.payments.find_one({'email': email})
        if paid_user == None:
            user_spent = 0
        else:
            user_spent = sum(payment['amount'] for payment in paid_user['payments'])

        notification_document = {
            'first': first,
            'last': last,
            'email': email,
            'new_inquiry': {'inquiry_date': date, 'inquiry': inquiry},
            'previous_inquiries': existing_user['inquiries'] if existing_user != None else None,
            'user_spent': user_spent
        }

        if existing_user == None:
            document = {
                'first': first,
                'last': last,
                'email': email,
                'inquiries': [
                    {
                        'inquiry_date': date,
                        'inquiry': inquiry
                    }
                ]
            }

            self.clients.insert_one(document)
            self.client_notifications.insert_one(notification_document)

            return True
        
        # Check this returns what we want
        inquiry_dates = sorted([inquiry['inquiry_date'] for inquiry in existing_user['inquiries']])
        if (date - inquiry_dates[-1]).days < 10:
            return inquiry_dates[-1]

        self.clients.update_one(
            {'email': email},
            {'$push': {'inquiries': {'inquiry_date': date, 'inquiry': inquiry}}}
        )
        self.client_notifications.insert_one(notification_document)

        return True

    def add_payment(self, first, last, email, payment_id, purchase, amount, currency):
        date = datetime.utcnow()

        paid_user = self.payments.find_one({'email': email})

        push_doc = {
            'payment_id': payment_id,
            'purchase_date': date,
            'purchase': purchase,
            'amount': amount,
            'currency': currency
        }

        if paid_user == None:
            document = {
                'first': first,
                'last': last,
                'email': email,
                'payments': [push_doc]
            }

            self.payments.insert_one(document)

            return True

        self.payments.update_one(
            {'email': email},
            {'$push': {'payments': push_doc}}
        )

        return True 

    def admin_view_inquiry_notifications(self):
        new_inquiries = self.client_notifications.find()

        if new_inquiries == None:
            return False

        return list(new_inquiries)

    def admin_delete_inquiry_notification(self, inquiry_notification_id):
        query = {'_id': ObjectId(inquiry_notification_id)}

        find_inquiry = self.client_notifications.find_one(query)
        if find_inquiry == None:
            return False

        self.client_notifications.delete_one(query)

        return True

    def admin_create_payment_id(self, purchase, amount, currency):
        document = {'purchase': purchase, 'amount': amount, 'currency': currency, 'timeCreated': datetime.utcnow(), 'expiry': datetime.utcnow() + timedelta(seconds=self.expires_in)}
        payment_id = self.payment_ids.insert_one(document)

        return {**{'payment_id': payment_id.inserted_id}, **document}

    def admin_delete_payment_id(self, payment_id):
        id_exists = self.payment_ids.find_one({'_id': ObjectId(payment_id)})

        if id_exists == None:
            return False

        self.payment_ids.delete_one({'_id': payment_id})

        return True

    def admin_view_payment_ids(self):
        payment_ids = self.payment_ids.find()

        return list(payment_ids)

    def admin_view_payment_id_details(self, payment_id):
        payment_id_info = self.payment_ids.find_one({'_id': ObjectId(payment_id)})

        if payment_id_info == None:
            return False

        return payment_id_info

    def admin_login(self, username, password):
        salt = "oTaLtzyE2SvGIzGXnDqmGzdBpz0DP3xQROY0W5t4sKdTdX5PIg"
        user_info = self.admin_auth.find_one({'username': username})

        if user_info == None:
            return False
        
        hashed_password = hashlib.sha512((password+salt).encode('utf-8')).hexdigest()
        if hashed_password == user_info['password']:
            return True
        
        return False