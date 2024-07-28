import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room2Detail.css';
import roomImage from '../pics/room2.png';
import overlayImage from '../pics/candle.png';
import soundImage from '../pics/sound.svg'; // Добавьте ваш звук

function Room2Detail() {
    const [isCandleVisible, setisCandleVisible] = useState(true);
    const [showDetails, setShowDetails] = useState(null);
    const navigate = useNavigate();
    const audioRef = useRef(new Audio(`../audio/item1.mp3`)); // Инициализация аудио

    const handleCandleClick = () => {
        setisCandleVisible(false);
        setShowDetails('item1');
    };

    const handleClose = () => {
        setisCandleVisible(true);
        setShowDetails(null);
        audioRef.current.pause(); // Остановить аудио при закрытии
        audioRef.current.currentTime = 0; // Сбросить время воспроизведения
    };

    const handleBack = () => {
        navigate('/user');
    };

    const handleAudioPlay = () => {
        audioRef.current.play(); // Воспроизвести аудио
    };

    return (
        <div className={`room-detail-container-2`}>
            <button className="back-button-2" onClick={handleBack}>Назад к комнатам</button>
            {isCandleVisible ? (
                <>
                    <div className="blur-filter-2" />
                    <div className="large-text-rectangle-2">Ремесленная мастерская</div>
                </>
            ) : (
                <div className="no-blur-filter-2"/>
            )}
            <div className={`clickable-candle ${isCandleVisible ? '' : 'hidden'}`} onClick={handleCandleClick}>
                <img src={overlayImage} alt="Открыть детали" className="overlay-image-2"/>
            </div>
            {showDetails && (
                <div className="details-overlay-2">
                    <button className="close-button-2" onClick={handleClose}>
                        <span>&times;</span> {/* Крестик для закрытия */}
                    </button>
                    <h2 className="overlay-header-2">Мастерская</h2>
                    <div className="details">
                        <p>Вы находитесь в ремесленной мастерской, где оживали традиционные народные искусства и
                            ремесла, которые были важной частью жизни в усадьбе. Здесь вы видите старинные прялки и
                            станки для ткачества, которые использовались для создания уникальных тканых изделий и
                            одежды. На стенах висят рушники с традиционными вышитыми узорами, изображающими сцены из
                            сельской жизни и мифологии. Традиционный народный костюм на манекене с богатой вышивкой
                            передает дух того времени и демонстрирует мастерство и творчество, передававшиеся из
                            поколения в поколение.</p>
                        <button onClick={handleAudioPlay} className="sound-button">
                            <img src={soundImage} alt="Воспроизвести звук" className="sound-image"/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Room2Detail;
