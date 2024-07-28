import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room3Detail.css'; // Подключаем CSS файл
import '../css/PasswordForm.css'; // Подключаем CSS файл
import roomImage from '../pics/room3.png';
import overlayImage from "../pics/pralka.png";

function Room3Detail() {
    const [showDetails, setShowDetails] = useState(null); // Хранение состояния выбранного объекта
    const [isPralkaVisible, setIsPralkaVisible] = useState(true); // Хранение состояния видимости балалайки
    const navigate = useNavigate();
    const audio = document.getElementById('audio');
    const audioIcon = document.querySelector('.audio-icon');

    function toggleAudio() {
        if (audio.paused) {
            audio.play();
            audioIcon.innerHTML = '<img src="../pics/sound.svg" alt="Pause Icon"/>';
        } else {
            audio.pause();
            audioIcon.innerHTML = '<img src="../pics/sound.svg" alt="Play Icon"/>';
        }
    }
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
            <button className="back-button-3" onClick={handleBack}>Назад к комнатам</button>
            {isPralkaVisible ? (
                <>
                    <div className="blur-filter-3"/>
                    <div className="large-text-rectangle-3">Домашний уют</div>
                </>
            ) : (
                <div className="no-blur-filter-3"/>
            )}
            <div className={`clickable-pralka ${isPralkaVisible ? '' : 'hidden'}`} onClick={handlePralkaClick}>
                <img src={overlayImage} alt="Открыть детали" className="overlay-image-3"/>
            </div>
            {showDetails && (
                <div className="details-overlay-3">
                    <button className="close-button-3" onClick={handleClose}>
                        <span>&times;</span> {/* Крестик для закрытия */}
                    </button>
                    <h2 className="overlay-header-3">Домашний уют</h2>
                    <div className="details">
                        <p>Добро пожаловать в уютную домашнюю комнату усадьбы, где проходили тихие семейные вечера и
                            приемы гостей. Здесь вы видите мебель конца XVIII века, включая элегантный диван и кресла с
                            зелеными подушками, отражающие стиль и комфорт той эпохи. Лютня на диване напоминает о любви
                            семьи к музыке и искусству. Картина на мольберте и пейзаж на стене добавляют нотки природы и
                            вдохновения в интерьер комнаты. Туалетный столик с зеркалом и кружевной салфеткой создают
                            атмосферу уюта и спокойствия, где проводились часы за чтением, рукоделием и беседами.
                            Эти комнаты усадьбы прадеда Пушкина не только рассказывают о жизни и культуре того времени,
                            но и о наследии, которое вдохновляло будущего великого поэта.</p>
                        <audio controls>
                            <source src={`../audio/${showDetails}.mp3`} type="audio/mpeg"/>
                            Ваш браузер не поддерживает элемент audio.
                        </audio>
                        <button className="audio-icon" onClick={toggleAudio}>
                            <img src="path/to/your/icon.png" alt="Audio Icon"/>
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Room3Detail;
