import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room3Detail.css';
import overlayImage from "../pics/pralka.png";
import soundImage from "../pics/sound.svg";
import pauseImage from "../pics/pause.svg";
import audioFile from '../audio/room3.mp3';

function Room3Detail() {
    const [showDetails, setShowDetails] = useState(null);
    const [isPralkaVisible, setIsPralkaVisible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();
    const audioRef = useRef(new Audio(audioFile));

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
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="room-detail-container-3">
            <button className="back-button-3" onClick={handleBack}>Назад к комнатам</button>
            {isPralkaVisible ? (
                <>
                    <div className="blur-filter-3"/>
                    <div className="large-text-rectangle-3">Ремесленная мастерская</div>
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
                    <h2 className="overlay-header-3">

                        <button onClick={handleAudioPlayPause} className="sound-button">
                            <img
                                src={isPlaying ? pauseImage : soundImage}
                                alt={isPlaying ? "Пауза" : "Воспроизвести звук"}
                                className="sound-image"
                            />
                        </button>
                        Мастерская
                    </h2>
                    <div className="details-content-3">
                        <p>Вы находитесь в ремесленной мастерской, где оживали
                            традиционные народные искусства и ремесла, которые
                            были важной частью жизни в усадьбе. Здесь вы видите
                            старинные прялки и станки для ткачества, которые
                            использовались для создания уникальных тканых
                            изделий и одежды. На стенах висят рушники с традиционными
                            вышитыми узорами, изображающими сцены из сельской жизни
                            и мифологии. Традиционный народный костюм на манекене с
                            богатой вышивкой передает дух того времени и демонстрирует
                            мастерство и творчество, передававшиеся из поколения в поколение.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Room3Detail;
