import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room1Detail.css'; // Подключаем CSS файл
import roomImage from '../pics/room1.png'; // Импортируем изображение комнаты
import overlayImage from '../pics/balal.png'; // Импортируем изображение комнаты

function Room1Detail() {
    const [showDetails, setShowDetails] = useState(null); // Хранение состояния выбранного объекта
    const [isBalalaVisible, setisBalalaVisible] = useState(true); // Хранение состояния видимости балалайки
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
        navigate('/user');
    };

    return (
        <div className={`room-detail-container`}>
            <button className="back-button" onClick={handleBack}>Назад к комнатам</button>
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
