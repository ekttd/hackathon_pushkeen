import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room3Detail.css'; // Подключаем CSS файл
import overlayImage from "../pics/pralka.png";
import soundImage from "../pics/sound.svg";
import pauseImage from "../pics/pause.svg"; // Добавьте изображение паузы
import audioFile from '../audio/room3.mp3';

function Room3Detail() {
    const [showDetails, setShowDetails] = useState(null); // Хранение состояния выбранного объекта
    const [isPralkaVisible, setIsPralkaVisible] = useState(true); // Хранение состояния видимости балалайки
    const [isPlaying, setIsPlaying] = useState(false); // Хранение состояния воспроизведения
    const navigate = useNavigate();
    const audioRef = useRef(new Audio(audioFile)); // Создаем реф для объекта Audio

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

    const handleAudioPlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause(); // Приостановить аудио
        } else {
            audioRef.current.play(); // Воспроизвести аудио
        }
        setIsPlaying(!isPlaying); // Переключить состояние воспроизведения
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
                        <button onClick={handleAudioPlayPause} className="sound-button">
                            <img
                                src={isPlaying ? pauseImage : soundImage}
                                alt={isPlaying ? "Пауза" : "Воспроизвести звук"}
                                className="sound-image"
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Room3Detail;
