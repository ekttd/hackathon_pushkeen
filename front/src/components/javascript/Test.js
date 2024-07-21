import React, { useState } from 'react';
import '../css/Test.css';

const TestPage = () => {
    const questions = [
        {
            question: 'Какой город является столицей России?',
            options: ['Москва', 'Санкт-Петербург', 'Казань'],
            answer: 0,
        },
        // Добавьте еще 9 вопросов в том же формате
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
        <div>
            {questions.map((question, index) => (
                <div key={index}>
                    <p>{question.question}</p>
                    {question.options.map((option, optionIndex) => (
                        <label key={optionIndex}>
                            <input
                                type="checkbox"
                                value={optionIndex}
                                checked={answers[index] === optionIndex}
                                onChange={e => handleAnswerChange(index, e.target.value)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit} disabled={answers.some(answer => answer === null)}>
                Отправить ответы
            </button>
            {showResults && <p>Результаты теста будут показаны после нажатия кнопки.</p>}
        </div>
    );
};

export default Test;
