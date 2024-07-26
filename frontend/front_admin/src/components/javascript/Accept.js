import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Accept.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationButtons from "./NavigationButtons";

function Accept() {
    const navigate = useNavigate();
    const [showWarning, setShowWarning] = useState(false);

    const handleTestAccepted = () => {
        setShowWarning(true);
    };

    const handleConfirmTest = () => {
        navigate('/test');
    };

    const handleDeclineTest = () => {
        navigate('/'); // Предполагается, что '/' - это стартовая страница
    };

    const handleDebilTest = () => {
        setShowWarning(false); // Закрываем окно с предупреждением
    };

    return (
        <div className="accept-container">
            <NavigationButtons />
            {showWarning ? (
                <div className="accept-message-overlay">
                    <div className="accept-message-box">
                        <p className="accept-message-text">На прохождение теста есть одна попытка. Пожалуйста, отвечайте внимательно.</p>
                        <button className="accept-modal-button" onClick={handleConfirmTest}>Продолжить</button>
                        <button className="accept-modal-button" onClick={handleDebilTest}>Назад</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="accept-message-title">Благодарим за визит!</p>
                    <p className="accept-message-text">Предлагаем пройти тест, за который вы можете получить баллы и
                        потратить на нашу фирменную продукцию</p>
                    <div className="accept-modal-buttons">
                        <button className="accept-modal-button" onClick={handleTestAccepted}>Пройти тест</button>
                        <button className="accept-modal-button" onClick={handleDeclineTest}>Нет, спасибо</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Accept;
