import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room1Detail.css'; // Подключаем CSS файл
import roomImage from '../pics/room1.png'; // Импортируем изображение комнаты
import overlayImage from '../pics/balal.png'; // Импортируем изображение комнаты

function Room1Detail() {
    const [showDetails, setShowDetails] = useState(null); // Хранение состояния выбранного объекта
    const [isBalalaVisible, setisBalalaVisible] = useState(true); // Хранение состояния видимости балалайки
    const [adminPassword, setAdminPassword] = useState('');
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'false');
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
        if (isAdmin) {
            setShowPasswordPrompt(true);
        } else {
            navigate('/user');
        }
    };

    const handlePasswordSubmit = () => {
        if (adminPassword === 'exitpass') {
            navigate('/user');
        } else {
            alert('Неверный пароль');
        }
    };

    return (
        <div className={`room-detail-container`}>
            <button className="back-button" onClick={handleBack}>Назад к комнатам</button>
            <div className="image-container">
                <img src={roomImage} alt="Комната" className="full-image"/>
            </div>
            <div className={`clickable-balal ${isBalalaVisible ? '' : 'hidden'}`} onClick={handleBalalaClick}>
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

export default Room1Detail;
