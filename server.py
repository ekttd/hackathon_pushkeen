from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from datetime import datetime
import random

app = Flask(__name__)
app.secret_key = 'kkk'

client = MongoClient('mongodb://localhost:27017/')

if client.cluster_description is not None:
    print('Connected to MongoDB')
else:
    print('Failed to connect to MongoDB')

db = client['pushkeen']
users = db['users']


def generate_unique_code():
    while True:
        code = random.randint(100000, 999999)
        if not users.find_one({'code': code}):
            return code

def get_end_of_day():
    now = datetime.now()
    end_of_day = datetime(now.year, now.month, now.day, 23, 59, 59)
    return end_of_day

@app.route('/add_user', methods=['POST'])
def add_user():
    username = request.json.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    code = generate_unique_code()
    end_of_day = get_end_of_day()

    user_data = {
        'username': '',
        '_id': users.count_documents({}) + 1,
        'coins': 0,
        'valid_date': end_of_day,
        'code': code
    }
    users.insert_one(user_data)

    return jsonify({'message': f'User added with code: {code}'}), 200


@app.route('/submit_code', methods=['POST'])
def submit_code():
    code = request.json.get('code')
    if not code:
        return jsonify({'error': 'Code is required'}), 400

    user = users.find_one({'code': int(code)})
    if user:
        valid_date = user['valid_date'].date()
        now = datetime.now().date()
        if now != valid_date:
            return jsonify({'error': 'The code is no longer valid'}), 400
        return jsonify({'message': 'Code is valid', 'code': code}), 200
    else:
        return jsonify({'error': 'Invalid code'}), 400


@app.route('/update_username', methods=['POST'])
def update_username():
    code = request.json.get('code')
    username = request.json.get('username')

    if not code or not username:
        return jsonify({'error': 'Code and username are required'}), 400

    result = users.update_one({'code': int(code)}, {'$set': {'username': username}})

    if result.modified_count == 1:
        return jsonify({'message': 'Username updated successfully'}), 200
    else:
        return jsonify({'error': 'Failed to update username or user not found'}), 400


@app.route('/add_coin', methods=['POST'])
def add_coin():
    result = users.update_one({'code': 123456}, {'$inc': {'coins': 1}})
    updated_user = users.find_one({'coins': 1})
    if updated_user:
        print(f'New coins amount: {updated_user["coins"]}')
        return render_template('index.html', coins=updated_user['coins'])
    else:
        print('User not found')
        return 404


if __name__ == '__main__':
    app.run(debug=True)
