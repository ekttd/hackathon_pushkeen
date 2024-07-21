import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import successImage from '../pics/building.jpg'; // Замените на путь к вашей анимации

function Register() {
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const validCode = '123456'; // Пример правильного кода
    const adminCode = '999999'; // Специальный код для администратора

    const handleGenerateCode = () => {
        // В реальном приложении здесь будет запрос к серверу для генерации кода
        setCodeSent(true);
        setShowCodeInput(true);
        setErrorMessage('');
    };

    const handleCodeSubmit = () => {
        if (/^\d{6}$/.test(code)) {
            if (code === validCode) {
                setShowNameInput(true);
                setErrorMessage('');
            } else if (code === adminCode) {
                localStorage.setItem('isAdmin', 'true'); // Устанавливаем информацию о привилегиях
                setShowSuccess(true);
                setTimeout(() => navigate('/user'), 2000); // Переход на страницу выбора комнат через 2 секунды
            } else {
                setErrorMessage('Неверный код. Пожалуйста, введите 6-значный код.');
            }
        } else {
            setErrorMessage('Код должен быть 6-значным числом.');
        }
    };

    const handleRegister = () => {
        if (username.trim()) {
            localStorage.setItem('username', username);
            setShowSuccess(true);
            setTimeout(() => navigate('/user'), 2000); // Переход на страницу выбора комнат через 2 секунды
        } else {
            setErrorMessage('Пожалуйста, введите ваше имя.');
        }
    };

    return (
        <div className="register-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="register-form">
                <h1>Регистрация</h1>
                {!codeSent ? (
                    <button onClick={handleGenerateCode} className="main-button">Сгенерировать код</button>
                ) : (
                    <>
                        {showCodeInput && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Введите код"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="input-field"
                                />
                                <button onClick={handleCodeSubmit} className="main-button">Проверить код</button>
                            </>
                        )}
                        {showNameInput && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Введите ваше имя"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field"
                                />
                                <button onClick={handleRegister} className="main-button">Зарегистрироваться</button>
                            </>
                        )}
                    </>
                )}
            </div>
            {showSuccess && (
                <div className="success-overlay">
                    <div className="success-animation">
                        <img src={successImage} alt="Success" className="success-image" />
                    </div>
                    <p>Успешная регистрация!</p>
                </div>
            )}
        </div>
    );
}

export default Register;
