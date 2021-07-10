from flask.globals import current_app
import jwt
from database import ErrorCodes
import json
from flask import request, jsonify, current_app
from functools import wraps
import traceback

def sanitizeJSON(json_raw):
    return json.loads(json.dumps(json_raw, default=str))

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
            jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
        
        except:
            err = traceback.format_exc()
            print(err)
            return jsonify({'success': False, 'error_code': ErrorCodes.error_code_token, 'error': err}), 400
        
        return f(*args, **kwargs)
    
    return decorated