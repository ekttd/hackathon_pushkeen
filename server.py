from flask import Flask, render_template, request, redirect, url_for, flash
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


from flask import jsonify

@app.route('/add_user', methods=['POST'])
def add_user():
    username = request.form.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    code = generate_unique_code()
    user_data = {
        'username': username,
        '_id': users.count_documents({}) + 1,
        'coins': 0,
        'valid_date': datetime.strptime('2024-07-19T00:00:00.000+00:00', '%Y-%m-%dT%H:%M:%S.%f+00:00'),
        'code': code
    }
    users.insert_one(user_data)
    return jsonify({'message': f'User added with code: {code}'}), 200

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
