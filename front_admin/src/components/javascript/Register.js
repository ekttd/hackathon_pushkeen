import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

const CORRECT_CODE = '123456';

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
            }
        }
    };

    const handleCodeSubmit = () => {
        const fullCode = code.join('');
        if (fullCode.length === 6) {
            if (fullCode === CORRECT_CODE) {
                navigate('/admin');
            } else {
                setErrorMessage('Неверный код. Пожалуйста, введите 6-значный код.');
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
                            <div className="code-container">
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
