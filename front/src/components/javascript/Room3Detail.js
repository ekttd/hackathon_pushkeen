import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room3Detail.css'; // Подключаем CSS файл
import roomImage from '../pics/room3.png';
import overlayImage from "../pics/pralka.png"; // Импортируем изображение комнаты

function Room3Detail() {
    const [showDetails, setShowDetails] = useState(null); // Хранение состояния выбранного объекта
    const [isPralkaVisible, setIsPralkaVisible] = useState(true); // Хранение состояния видимости балалайки
    const [adminPassword, setAdminPassword] = useState('');
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const navigate = useNavigate();
    const [showCodePrompt, setShowCodePrompt] = useState(false);

    const handlePralkaClick = () => {
        setIsPralkaVisible(false);
        setShowDetails('item1');
    };

    const handleClose = () => {
        setIsPralkaVisible(true);
        setShowDetails(null);
    };

    const handleBack = () => {
        if (isAdmin) {
            setShowCodePrompt(true);
        } else {
            navigate('/user');
        }
    };

    const handlePasswordSubmit = () => {
        if (adminPassword === '123456') { // Замените '123456' на правильный код доступа
            navigate('/select'); // Замените '/select' на правильный путь к странице выбора
            setShowCodePrompt(false);
            setAdminPassword('');
        } else {
            alert('Неверный код доступа');
        }
    };

    return (
        <div className="room-detail-container">
            {showCodePrompt && (
                <div className="code-prompt-overlay">
                    <div className="code-prompt">
                        <h3>Введите шестизначный код доступа</h3>
                        <input
                            type="text"
                            maxLength="6"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Код доступа"
                        />
                        <button onClick={handlePasswordSubmit}>Подтвердить</button>
                        <button onClick={() => setShowCodePrompt(false)}>Отмена</button>
                    </div>
                </div>
            )}
            <button className="back-button" onClick={handleBack}>Назад к комнатам</button>
            <div className={`image-container ${isPralkaVisible ? '' : 'normal-back'}`} onClick={handlePralkaClick}>
                <img src={roomImage} alt="Комната" className="full-image"/>
            </div>
            {isPralkaVisible && (
                <div className="large-text-rectangle">Комната 3</div>
            )}
            <div className={`clickable-pralka ${isPralkaVisible ? '' : 'hidden'}`} onClick={handlePralkaClick}>
                <img src={overlayImage} alt="Открыть детали" className="overlay-image"/>
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
            {showPasswordPrompt && (
                <div className="password-prompt-overlay">
                    <div className="password-prompt">
                        <h3>Введите специальный пароль</h3>
                        <input
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Пароль"
                        />
                        <button onClick={handlePasswordSubmit}>Подтвердить</button>
                        <button onClick={() => setShowPasswordPrompt(false)}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Room3Detail;