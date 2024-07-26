// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import '../css/Register.css';
import successImage from '../pics/building.jpg';
import axios from 'axios';
import NavigationButtons from "./NavigationButtons";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    withCredentials: true
});

function Register() {
    const [username, setUsername] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUser(); // Используем setUser для обновления контекста

    const handleGenerateCode = async () => {
        try {
            const response = await instance.post('/add_user', { username: '' });

            if (response.status === 200) {
                setCodeSent(true);
                setShowCodeInput(true);
                setErrorMessage('');
            } else {
                const errorData = response.data;
                setErrorMessage(errorData.error || 'Ошибка при генерации кода.');
            }
        } catch (error) {
            setErrorMessage('Ошибка при соединении с сервером.');
        }
    };

    const handleCodeChange = (e, index) => {
        const { value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                document.getElementById(`code-input-${index + 1}`).focus();
            }
        }
    };

    const handleCodeSubmit = async () => {
        const fullCode = code.join('');
        if (fullCode.length === 6) {
            try {
                const response = await instance.post('/submit_code', { code: fullCode });

                if (response.status === 200) {
                    setShowNameInput(true);
                    setErrorMessage('');
                } else {
                    const errorData = response.data;
                    setErrorMessage('Неверный код. Пожалуйста, введите 6-значный код.');
                }
            } catch (error) {
                setErrorMessage('Ошибка при соединении с сервером.');
            }
        } else {
            setErrorMessage('Код должен быть 6-значным числом.');
        }
    };

    const handleRegister = async () => {
        const fullCode = code.join('');
        if (username.trim()) {
            try {
                const response = await instance.post('/update_username', { code: fullCode, username });
                if (response.status === 200) {
                    localStorage.setItem('userCode', fullCode);  // Сохранение кода в localStorage
                    setUser({ code: fullCode }); // Обновление кода в UserContext
                    setShowSuccess(true);
                    setTimeout(() => navigate('/user'), 2000);
                } else {
                    const errorData = response.data;
                    setErrorMessage(errorData.error || 'Ошибка при обновлении имени.');
                }
            } catch (error) {
                setErrorMessage('Ошибка при соединении с сервером.');
            }
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
                                <div className="code-input-container">
                                    {code.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`code-input-${index}`}
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleCodeChange(e, index)}
                                            className="code-input"
                                            maxLength="1"
                                        />
                                    ))}
                                </div>
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
            <NavigationButtons />
        </div>
    );
}

export default Register;
