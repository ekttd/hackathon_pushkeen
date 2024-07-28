import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room2Detail.css'; 
import roomImage from '../pics/room2.png'; 
import overlayImage from '../pics/candle.png';

function Room2Detail() {
    const [isCandleVisible, setisCandleVisible] = useState(true);
    const [showDetails, setShowDetails] = useState(null); 
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
        navigate('/user');
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

export default Room2Detail;
