import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room2Detail.css'; // Подключаем CSS файл
import roomImage from '../pics/room2.png'; // Импортируем изображение комнаты
import overlayImage from '../pics/candle.png';

function Room2Detail() {
    const [isCandleVisible, setisCandleVisible] = useState(true);
    const [showDetails, setShowDetails] = useState(null); // Хранение состояния выбранного объекта
    const [adminPassword, setAdminPassword] = useState('');
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'false');
    const navigate = useNavigate();

    const handleCandleClick = () => {
        setisCandleVisible(false);
        setShowDetails('item1');
    };

    const handleClose = () => {
        setisCandleVisible(true);
        setShowDetails(null);
    };

    const handleBack = () => {
        if (isAdmin) {
            setShowPasswordPrompt(true);
        } else {
            navigate('/admin');
        }
    };

    const handlePasswordSubmit = () => {
        if (adminPassword === 'exitpass') {
            navigate('/admin');
        } else {
            alert('Неверный пароль');
        }
    };

    return (
        <div className={`room-detail-container`}>
            <button className="back-button" onClick={handleBack}>Назад к комнатам</button>
            <div className={`image-container ${isCandleVisible ? '' : 'normal-back'}`} onClick={handleCandleClick}>
                <img src={roomImage} alt="Комната" className="full-image"/>
            </div>
            {isCandleVisible && (
                <div className="large-text-rectangle-2">Комната 2</div>
            )}
            <div className={`clickable-candle ${isCandleVisible ? '' : 'hidden'}`} onClick={handleCandleClick}>
                <img src={overlayImage} alt="Открыть детали" className="overlay-image-2"/>
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

export default Room2Detail;
