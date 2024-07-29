import React, {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room1Detail.css';
import roomImage from '../pics/room1.png';
import overlayImage from '../pics/balal.png';
import soundImage from "../pics/sound.svg";
import pauseImage from "../pics/pause.svg"; // Добавьте изображение паузы
import audioFile from '../audio/room1.mp3';

function Room1Detail() {
    const [showDetails, setShowDetails] = useState(null);
    const [isBalalaVisible, setIsBalalaVisible] = useState(true);
    const navigate = useNavigate();
    const audioRef = useRef(new Audio(audioFile)); // Создаем реф для объекта Audio
    const [isPlaying, setIsPlaying] = useState(false); // Хранение состояния воспроизведения

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

    const handleAudioPlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause(); // Приостановить аудио
        } else {
            audioRef.current.play(); // Воспроизвести аудио
        }
        setIsPlaying(!isPlaying); // Переключить состояние воспроизведения
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

export default Room1Detail;
