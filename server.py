from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import random

app = Flask(__name__)
CORS(app)
app.secret_key = 'kkk'

client = MongoClient('mongodb://localhost:27017/')

if client.cluster_description is not None:
    print('Connected to MongoDB')
else:
    print('Failed to connect to MongoDB')

db = client['pushkeen']
users = db['users']
questions = db['questions']


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
    username = request.json.get('username', '')

    code = generate_unique_code()
    end_of_day = get_end_of_day()

    user_data = {
        'username': username,
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

        session['user_code'] = code
        session['username'] = user.get('username', '')
        session['coins'] = user.get('coins', 0)

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
        user = users.find_one({'code': int(code)})
        session['username'] = user['username']
        return jsonify({'message': 'Username updated successfully'}), 200
    else:
        return jsonify({'error': 'Failed to update username or user not found'}), 400


@app.route('/session_info', methods=['GET'])
def session_info():
    if 'username' in session and 'coins' in session:
        return jsonify({
            'username': session['username'],
            'coins': session['coins']
        }), 200
    else:
        return jsonify({'error': 'No user is logged in'}), 400


@app.route('/add_coin', methods=['POST'])
def add_coin():
    if 'user_code' not in session:
        return jsonify({'error': 'User is not logged in'}), 400

    user_code = session['user_code']

    result = users.update_one({'code': int(user_code)}, {'$inc': {'coins': 1}})

    if result.modified_count == 1:
        updated_user = users.find_one({'code': int(user_code)})
        session['coins'] = updated_user['coins']
        return jsonify({'message': 'Coin added successfully', 'coins': updated_user['coins']}), 200
    else:
        return jsonify({'error': 'Failed to add coin or user not found'}), 400


@app.route('/get_question', methods=['GET'])
def get_question_route():
    question_data = questions.aggregate([{'$sample': {'size': 1}}]).next()
    question = question_data.get('question')
    answers = [question_data.get('answer'), question_data.get('trap_1'), question_data.get('trap_2')]
    random.shuffle(answers)
    question_info = {
        'question': question,
        'answers': answers
    }
    return jsonify(question_info), 200


if __name__ == '__main__':
    app.run(debug=True)
