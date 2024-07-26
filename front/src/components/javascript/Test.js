// src/Test.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Test.css';
import { useUser } from './UserContext';

const shuffleArray = (array) => {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [coins, setCoins] = useState(0);
    const [notification, setNotification] = useState('');
    const [currentShuffledAnswers, setCurrentShuffledAnswers] = useState([]);
    const navigate = useNavigate();
    const { user } = useUser();
    const userCode = user.code;

    useEffect(() => {
        axios.get('http://localhost:5000/get_questions')
            .then(response => {
                const data = response.data;
                setQuestions(data);
                setAnswers(Array(data.length).fill(null));
                setCurrentShuffledAnswers(data.map(q => shuffleArray([q.answer, q.trap_1, q.trap_2])));
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleBack = () => {
        navigate('/');
    };

    const handleAnswerChange = (value) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentQuestionIndex] = value;
            return newAnswers;
        });
    };

    const handleSubmit = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            submitAnswers();
        }
    };

    const submitAnswers = () => {
        if (!userCode) {
            setNotification('Код пользователя не найден.');
            return;
        }

        const answerData = questions.map((question, index) => ({
            question_id: question._id,
            selected_answer: currentShuffledAnswers[index][answers[index]]
        }));

        axios.post('http://localhost:5000/submit_answers', { answers: answerData, user_code: userCode }, { withCredentials: true })
            .then(response => {
                setCorrectAnswers(response.data.correct_answers);
                setCoins(response.data.coins);
                setNotification(`Вы ответили правильно на ${response.data.correct_answers} вопросов и получили ${response.data.coins} монет.`);
                setShowResults(true);
            })
            .catch(error => {
                console.error('Error submitting answers:', error);
                setNotification('Произошла ошибка при отправке ответов.');
            });
    };

    if (questions.length === 0) {
        return <p>Загрузка вопросов...</p>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const shuffledAnswers = currentShuffledAnswers[currentQuestionIndex];

    return (
        <div className="test-container">
            <div className="test-form">
                <h1 className="test-title">Тест</h1>

                {!showResults  ? (
                    <div className="questions">
                        <div className="question">
                            <p>{currentQuestion.question}</p>
                            <div className="options options-horizontal">
                                {shuffledAnswers.map((option, optionIndex) => (
                                    <label key={optionIndex} className="option">
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestionIndex}`}
                                            value={optionIndex}
                                            checked={answers[currentQuestionIndex] === optionIndex}
                                            onChange={e => handleAnswerChange(parseInt(e.target.value))}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleSubmit} disabled={answers[currentQuestionIndex] === null}>
                            {currentQuestionIndex < questions.length - 1 ? 'Следующий вопрос' : 'Отправить ответы'}
                        </button>

                        {notification && <p className="notification">{notification}</p>}
                    </div>
                ) : (
                    <div>
                        <p>Вы ответили правильно на {correctAnswers} вопросов.</p>
                        <p>Ваши монеты: {coins}. Их можно потратить в нашем магазине</p>
                        <p>До скорых встреч!</p>
                        <button className="test-form button" onClick={handleBack}>На главную</button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Test;
