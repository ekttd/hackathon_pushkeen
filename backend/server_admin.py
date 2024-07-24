from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import random
from datetime import datetime
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

client = MongoClient('mongodb://localhost:27017/')
db = client['pushkeen']
admin = db['admin']


def generate_unique_code():
    while True:
        code = random.randint(100000, 999999)
        if not admin.find_one({'code': code}):
            return code


@app.route('/add_admin', methods=['POST'])
def add_admin():
    code = generate_unique_code()
    current_time = datetime.utcnow()
    admin_data = {
        '_id': admin.count_documents({}) + 1,
        'code': code,
        'start_time': current_time,
        'finish_time': datetime.strptime('2024-07-19T00:00:00.000+00:00', '%Y-%m-%dT%H:%M:%S.%f+00:00'),
    }

    try:
        admin.insert_one(admin_data)
        logging.info(f'Admin added with code: {code}')
        return jsonify({'message': f'Admin added with code: {code}', 'code': code}), 200
    except Exception as e:
        logging.error(f'Failed to add admin: {e}')
        return jsonify({'error': 'Failed to add admin'}), 500


@app.route('/submit_code', methods=['POST'])
def submit_code():
    code = request.json.get('code')
    if not code:
        return jsonify({'error': 'Code is required'}), 400

    admin_data = admin.find_one({'code': int(code)})

    if admin_data:
        return jsonify({'message': 'Code is valid'}), 200
    else:
        return jsonify({'error': 'Invalid code'}), 400


if __name__ == '__main__':
    app.run(debug=True)
