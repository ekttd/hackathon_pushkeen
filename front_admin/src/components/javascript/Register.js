import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [code, setCode] = useState(Array(6).fill(''));
    const [errorMessage, setErrorMessage] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(true);
    const [codeSent, setCodeSent] = useState(false);
    const navigate = useNavigate();

    const handleCodeChange = (e, index) => {
        const { value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                document.getElementById(`code-input-${index + 1}`).focus();
            } else if (value && index === 5) {
                handleCodeSubmit();
            }
        }
    };

    const handleGenerateCode = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/add_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: '' })
            });

            if (response.ok) {
                setCodeSent(true);
                setShowCodeInput(true);
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Ошибка при генерации кода.');
            }
        } catch (error) {
            setErrorMessage('Ошибка при соединении с сервером.');
        }
    };

    const handleCodeSubmit = async () => {
        const fullCode = code.join('');
        if (fullCode.length === 6) {
            try {
                const response = await fetch('http://127.0.0.1:5000/submit_code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ code: fullCode })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.message === 'Code is valid') {
                        navigate('/admin');
                    } else {
                        setErrorMessage('Неверный код. Пожалуйста, введите 6-значный код.');
                    }
                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.error || 'Ошибка при проверке кода.');
                }
            } catch (error) {
                setErrorMessage('Ошибка при соединении с сервером.');
            }
        } else {
            setErrorMessage('Код должен быть 6-значным числом.');
        }
    };

    return (
        <div className="register-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="register-form">
                <h1>Вход</h1>
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
                    </>
            </div>
        </div>
    );
}

export default Register;
