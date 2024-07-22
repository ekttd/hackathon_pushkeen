import React, { useState } from 'react';
import '../css/Test.css';

const Test = () => {
    const questions = [
        {
            question: 'Какой город является столицей России?',
            options: ['Москва', 'Санкт-Петербург', 'Казань'],
            answer: 0,
        },
    ];

    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [showResults, setShowResults] = useState(false);

    const handleAnswerChange = (index, value) => {
        setAnswers(prevAnswers => prevAnswers.map((answer, i) => (i === index ? value : answer)));
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (question.answer === answers[index]) {
                correctAnswers++;
            }
        });
        setShowResults(true);
        alert(`Вы ответили правильно на ${correctAnswers} из 10 вопросов.`);
    };

    return (
        <div className="test-container">
            <div className="test-form">
                <h1 className="test-title">Тест</h1>
                <div className="questions">
            {questions.map((question, index) => (
                <div key={index} className="question">
                    <p>{question.question}</p>
                    <div className="options options-horizontal">
                    {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="option">
                            <input
                                type="radio"
                                value={optionIndex}
                                checked={answers[index] === optionIndex}
                                onChange={e => handleAnswerChange(index, e.target.value)}
                            />
                            {option}
                        </label>
                    ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit} disabled={answers.some(answer => answer === null)}>
                Отправить ответы
            </button>
            {showResults && <p>Результаты теста будут показаны после нажатия кнопки.</p>}
                </div>
            </div>
        </div>
    );
};

export default Test;