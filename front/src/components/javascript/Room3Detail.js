import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room3Detail.css'; // Подключаем CSS файл
import '../css/PasswordForm.css'; // Подключаем CSS файл
import roomImage from '../pics/room3.png';
import overlayImage from "../pics/pralka.png"; // Импортируем изображение комнаты

function Room3Detail() {
    const [showDetails, setShowDetails] = useState(null); // Хранение состояния выбранного объекта
    const [isPralkaVisible, setIsPralkaVisible] = useState(true); // Хранение состояния видимости балалайки
    const navigate = useNavigate();

    const handlePralkaClick = () => {
        setIsPralkaVisible(false);
        setShowDetails('item1');
    };

    const handleClose = () => {
        setIsPralkaVisible(true);
        setShowDetails(null);
    };

    const handleBack = () => {
        navigate('/user');
    };

    return (
        <div className="room-detail-container-3">
            <button className="back-button" onClick={handleBack}>Назад к комнатам</button>
            {isPralkaVisible ? (
                <>
                    <div className="blur-filter-3"/>
                    <div className="large-text-rectangle-3">Комната 3</div>
                </>
            ) : (
                <div className="no-blur-filter-3"/>
            )}
            <div className={`clickable-pralka ${isPralkaVisible ? '' : 'hidden'}`} onClick={handlePralkaClick}>
                <img src={overlayImage} alt="Открыть детали" className="overlay-image-3"/>
            </div>
            {showDetails && (
                <div className="details-overlay-3">
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

export default Room3Detail;
