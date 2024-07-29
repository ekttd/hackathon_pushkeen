from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import random
import logging

app = Flask(__name__)

# Настройка CORS
cors = CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.secret_key = 'kkk'

# Настройка логирования
logging.basicConfig(level=logging.DEBUG)

# Подключение к MongoDB
try:
    client = MongoClient('mongodb://localhost:27017/')
    client.admin.command('ping')  # Проверка подключения
    logging.info('Connected to MongoDB')
except Exception as e:
    logging.error(f'Failed to connect to MongoDB: {e}')
    raise

db = client['pushkeen']
users = db['users']
questions_collection = db['questions']  # Коллекция для вопросов


def generate_unique_code():
    while True:
        code = random.randint(100000, 999999)
        if not users.find_one({'code': code}):
            return code


@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    code = generate_unique_code()
    user_data = {
        '_id': users.count_documents({}) + 1,
        'coins': 0,
        'valid_date': datetime.strptime('2024-07-19T00:00:00.000+00:00', '%Y-%m-%dT%H:%M:%S.%f+00:00'),
        'code': code
    }

    try:
        users.insert_one(user_data)
        logging.info(f'User added with code: {code}')
        return jsonify({'message': f'User added with code: {code}'}), 200
    except Exception as e:
        logging.error(f'Failed to add user: {e}')
        return jsonify({'error': 'Failed to add user'}), 500


@app.route('/submit_code', methods=['POST'])
def submit_code():
    code = request.json.get('code')
    if not code:
        return jsonify({'error': 'Code is required'}), 400

    user = users.find_one({'code': int(code)})
    if user:
        return jsonify({'message': 'Code is valid'}), 200
    else:
        return jsonify({'error': 'Invalid code'}), 400


@app.route('/update_username', methods=['POST'])
def update_username():
    data = request.json
    code = data.get('code')
    username = data.get('username')

    if not code or not username:
        return jsonify({'error': 'Code and username are required'}), 400

    result = users.update_one({'code': int(code)}, {'$set': {'username': username}})

    if result.modified_count == 1:
        return jsonify({'message': 'Username updated successfully'}), 200
    else:
        return jsonify({'error': 'Failed to update username'}), 500


@app.route('/get_questions', methods=['GET'])
def get_questions():
    questions = list(questions_collection.find({}))
    for q in questions:
        q['_id'] = str(q['_id'])  # Преобразование ObjectId в строку
    return jsonify(questions)


@app.route('/submit_answers', methods=['POST'])
def submit_answers():
    data = request.json
    logging.debug(f'Received data: {data}')  # Добавлено для отладки
    answers = data.get('answers', [])
    user_code = data.get('user_code')

    if not user_code:
        logging.error('User code is missing')
        return jsonify({'error': 'User code is required'}), 400

    if not answers:
        logging.error('Answers are missing')
        return jsonify({'error': 'Answers are required'}), 400

    correct_answers = 0

    for answer in answers:
        question_id = answer.get('question_id')
        selected_answer = answer.get('selected_answer')

        if not question_id or selected_answer is None:
            logging.error(f'Missing question_id or selected_answer in answer: {answer}')
            continue

        question = questions_collection.find_one({'_id': ObjectId(question_id)})
        if question and question['answer'] == selected_answer:
            correct_answers += 1

    user = users.find_one({'code': int(user_code)})
    if user:
        updated_user = users.update_one({'code': int(user_code)}, {'$inc': {'coins': correct_answers}})
        if updated_user.modified_count == 1:
            new_coin_balance = users.find_one({'code': int(user_code)})['coins']
        else:
            new_coin_balance = user['coins']
    else:
        new_coin_balance = 0

    return jsonify({'correct_answers': correct_answers, 'coins': new_coin_balance})


if __name__ == '__main__':
    app.run(debug=True)
