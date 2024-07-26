import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room1Detail.css'; // Подключаем CSS файл
import roomImage from '../pics/room1.jpeg'; // Импортируем изображение комнаты
import overlayImage from '../pics/balal.png'; // Импортируем изображение комнаты

function Room1Detail() {
    const [showDetails, setShowDetails] = useState(null); // Хранение состояния выбранного объекта
    const [isBalalaVisible, setisBalalaVisible] = useState(true); // Хранение состояния видимости балалайки
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const navigate = useNavigate();


    const handleBalalaClick = () => {
        setisBalalaVisible(false);
        setShowDetails('item1');
    };

    const handleClose = () => {
        setisBalalaVisible(true);
        setShowDetails(null);
    };
    const handleBack = () => {
        if (setIsAdmin) {
            setShowCodeInput(true);
        } else {
            navigate('/admin');
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
                        setShowNameInput(true);
                        setErrorMessage('');
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
        <div className={`room-detail-container`}>
            <button className="back-button" onClick={handleBack}>Назад к комнатам</button>
            {showCodeInput && (
                <div className="code-input-container">
                    <div className="code-input-wrapper">
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
                    <button onClick={handleCodeSubmit} className="code-button">Подтвердить</button>
                    <button onClick={() => setShowCodeInput(false)} className="code-button">Отмена</button>
                </div>
            )}
            <div className={`image-container ${isBalalaVisible ? '' : 'normal-back'}`} onClick={handleBalalaClick}>
                <img src={roomImage} alt="Комната" className="full-image"/>
            </div>
            {isBalalaVisible && (
                <div className="large-text-rectangle-1">Комната 2</div>
            )}
            <div className={`clickable-balal ${isBalalaVisible ? '' : 'hidden'}`} onClick={handleBalalaClick}>
                <img src={overlayImage} alt="Открыть детали" className="overlay-image-1"/>
            </div>
            {showDetails && (
                <div className="details-overlay">
                <button className="close-button" onClick={handleClose}>
                        <span>&times;</span> {/* Крестик для закрытия */}
                    </button>
                    <div className="details">
                        <h2>Информация о {showDetails}</h2>
                        <p>Здесь подробности о выбранном объекте {showDetails}.</p>
                        <audio controls>
                            <source src={`../audio/${showDetails}.mp3`} type="audio/mpeg"/>
                            Ваш браузер не поддерживает элемент audio.
                        </audio>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Room1Detail;
