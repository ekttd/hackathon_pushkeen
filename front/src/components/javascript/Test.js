import React, { useState, useEffect } from "react";
import "../css/Test.css";

function Test() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        // Имитация запроса к серверу для получения вопросов
        const mockQuestions = [
            {
                question: "Какого цвета небо?",
                options: ["Синий", "Зелёный", "Красный", "Жёлтый"],
            },
            {
                question: "Сколько дней в неделе?",
                options: ["5", "6", "7", "8"],
            },
        ];
        setQuestions(mockQuestions);
        setAnswers(Array(mockQuestions.length).fill(null));
    }, []); // Пустой массив зависимостей, чтобы эффект сработал только один раз при монтировании компонента

    const handleAnswerChange = (questionIndex, answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        // Имитация отправки ответов на сервер
        console.log("Отправленные ответы:", answers);
        alert("Ответы отправлены! Проверьте консоль для деталей.");
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
                                            name={`question-${index}`}
                                            onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="submit-button" disabled={answers.some((answer) => answer === null)} onClick={handleSubmit}>
                    Отправить ответы
                </button>
            </div>
        </div>
    );
}

export default Test;
