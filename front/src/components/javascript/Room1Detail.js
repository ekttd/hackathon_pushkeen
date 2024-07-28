import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room1Detail.css'; 
import roomImage from '../pics/room1.png'; 
import overlayImage from '../pics/balal.png';

function Room1Detail() {
    const [showDetails, setShowDetails] = useState(null);
    const [isBalalaVisible, setIsBalalaVisible] = useState(true); 
    const navigate = useNavigate();

    const handleBalalaClick = () => {
        setIsBalalaVisible(false);
        setShowDetails('room1');
        document.querySelector('.clickable-balal').classList.add('clicked'); 
        setTimeout(() => {
            document.querySelector('.clickable-balal').classList.remove('clicked'); 
        }, 300);
    };

    const handleClose = () => {
        setIsBalalaVisible(true);
        setShowDetails(null);
    };

    const handleBack = () => {
        navigate('/user');
    };

    return (
        <div className="room-detail-container">
            <button className="back-button-1" onClick={handleBack}>Назад к комнатам</button>
            {isBalalaVisible ? (
                <>
                    <div className="large-text-rectangle-1">Музыкальная гостиная</div>
                    <div className="blur-filter"/>
                </>
            ) : (
                <div className="no-blur-filter"/>
            )}

            <div className={`clickable-balal ${isBalalaVisible ? '' : 'hidden'}`} onClick={handleBalalaClick}>
                <img src={overlayImage} alt="Открыть детали" className="overlay-image-1"/>
            </div>

            {showDetails && (
    <div className="details-overlay-1">
        <button className="close-button-1" onClick={handleClose}>
            <span>&times;</span>
        </button>
        <h2 className="overlay-header">Комната для гостей</h2>
        <div className="details-content">
            <p>Добро пожаловать в уютную домашнюю комнату усадьбы, где проходили тихие семейные вечера и приемы гостей. Здесь вы видите мебель конца XVIII века, включая элегантный диван и кресла с зелеными подушками, отражающие стиль и комфорт той эпохи. Домра на диване напоминает о любви семьи к музыке и искусству. Картина на мольберте и пейзаж на стене добавляют нотки природы и вдохновения в интерьер комнаты. Туалетный столик с зеркалом и кружевной салфеткой создают атмосферу уюта и спокойствия, где проводились часы за чтением, рукоделием и беседами.</p>
            <audio controls className="overlay-audio">
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
