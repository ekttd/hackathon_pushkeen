import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room2Detail.css';
import roomImage from '../pics/room2.png';
import overlayImage from '../pics/candle.png';
import soundImage from "../pics/sound.svg";
import pauseImage from "../pics/pause.svg";
import audioFile from '../audio/room2.mp3';


function Room2Detail() {
    const [isCandleVisible, setisCandleVisible] = useState(true);
    const [showDetails, setShowDetails] = useState(null);
    const navigate = useNavigate();
    const audioRef = useRef(new Audio(audioFile));
    const [isPlaying, setIsPlaying] = useState(false);

    const handleCandleClick = () => {
        setisCandleVisible(false);
        setShowDetails('item1');
    };

    const handleClose = () => {
        setisCandleVisible(true);
        setShowDetails(null);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    const handleBack = () => {
        navigate('/user');
    };

    const handleAudioPlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };


    return (
        <div className={`room-detail-container-2`}>
            <button className="back-button-2" onClick={handleBack}>Назад к комнатам</button>
            {isCandleVisible ? (
                <>
                    <div className="blur-filter-2" />
                    <div className="large-text-rectangle-2">Музыкальная гостиная</div>
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
                    <h2 className="overlay-header-2">

                        <button onClick={handleAudioPlayPause} className="sound-button">
                            <img
                                src={isPlaying ? pauseImage : soundImage}
                                alt={isPlaying ? "Пауза" : "Воспроизвести звук"}
                                className="sound-image"
                            />
                        </button>

                        Гостиная
                    </h2>
                    <div className="details">
                        <p>Добро пожаловать в музыкальную гостиную усадьбы прадеда великого поэта Александра Сергеевича Пушкина. Эта комната была центром культурной жизни семьи, где часто устраивались музыкальные вечера и литературные чтения. Перед вами старинный рояль, изготовленный в конце XVIII века, на котором, возможно, играли классические произведения того времени. Рояль украшен изящной резьбой и инкрустацией, отражающей высокий статус семьи. Подсвечник на рояле создавал мягкое освещение для уютных вечеров, наполненных музыкой и творческим общением.</p>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Room2Detail;
