from pymongo import MongoClient
from datetime import datetime, timedelta
import dotenv
import os

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
        self.payment_ids = main['payment_ids']
        self.payment_ids.create_index("expiry", expireAfterSeconds=86400 * 7)

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

            return 1
        
        for inquiry in existing_user['inquiries']:
            inquiry_date = inquiry['inquiry_date']
            days_since = (date - inquiry_date).days
            if days_since < 10:
                return 0

        self.clients.update_one(
            {'email': email},
            {'$push': {'inquiries': {'inquiry_date': date, 'inquiry': inquiry}}}
        )
        self.client_notifications.insert_one(notification_document)

        return 1

    def add_payment(self, first, last, email, purchase, amount):
        date = datetime.utcnow()

        paid_user = self.payments.find_one({'email': email})

        if paid_user == None:
            document = {
                'first': first,
                'last': last,
                'email': email,
                'payments': [
                    {
                        'purchase_date': date,
                        'purchase': purchase,
                        'amount': amount
                    }
                ]
            }

            self.payments.inset_one(document)

            return 1

        self.payments.update_one(
            {'email': email},
            {'$push': {'payments': {'purchase_date': date, 'purchase': purchase, 'amount': amount}}}
        )

        return 1

    def admin_view_inquiry_notifications(self):
        new_inquiries = self.client_notifications.find()

        if new_inquiries == None:
            return None

        return new_inquiries

    def admin_delete_inquiry_notification(self, email):
        query = {'email': email}

        find_inquiry = self.client_notifications.find_one(query)
        if find_inquiry == None:
            return 0

        self.client_notifications.delete_one(query)

        return 1

    def admin_create_payment_id(self, purchase, amount):
        payment_id = self.payment_ids.insert_one({'purchase': purchase, 'amount': amount, 'expiry': datetime.utcnow()})

        return payment_id

    def admin_delete_payment_id(self, payment_id):
        id_exists = self.payment_ids.find_one({'_id': payment_id})

        if id_exists == None:
            return 0

        self.payment_ids.delete_one({'_id': payment_id})

        return 1

    def admin_view_payment_ids(self):
        payment_ids = self.payment_ids.find()

        return payment_ids

db = Database()
db.admin_create_payment_id('item', 10)