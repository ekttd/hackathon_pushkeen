import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room3Detail.css';
import overlayImage from "../pics/pralka.png";
import pauseImage from "../pics/pause.svg";
import audioFile from '../audio/room3.mp3';
import soundImage from "../pics/sound.svg";
const FIXED_CODE = '123456';

function Room3Detail() {
    const [showDetails, setShowDetails] = useState(null);
    const [isPralkaVisible, setIsPralkaVisible] = useState(true);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [showAudioButton, setShowAudioButton] = useState(false);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const handlePralkaClick = () => {
        setIsPralkaVisible(false);
        setShowDetails('item1');
        setShowAudioButton(true);
    };

    const handleClose = () => {
        setIsPralkaVisible(true);
        setShowDetails(null);
        setShowAudioButton(false);
        if (audioRef.current) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
        }
    };

    const handleBack = () => {
        if (setIsAdmin) {
            setShowCodeInput(true);
        } else {
            navigate('/admin');
        }
    };

    const handleCodeChange = (e, index) => {
        const { value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                document.getElementById(`code-input-${index + 1}`).focus();
            }
        }
    };

    const handleCodeSubmit = async () => {
        const fullCode = code.join('');
        if (fullCode.length === 6) {
            if (fullCode === FIXED_CODE) {
                setShowNameInput(true);
                setErrorMessage('');
                navigate('/admin');
            } else {
                setErrorMessage('Неверный код. Пожалуйста, введите 6-значный код.');
            }
        } else {
            setErrorMessage('Код должен быть 6-значным числом.');
        }
    };

    const toggleAudio = () => {
        if (isAudioPlaying) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
        } else {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsAudioPlaying(true);
        }
    };

    return (
        <div className="room-detail-container-3">
            <button className="back-button-3" onClick={handleBack}>Назад к комнатам</button>

            {showCodeInput && (
                <div className="code-input-container">
                    <div className="code-input-wrapper">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                id={`code-input-${index}`}
                                type="text"
                                value={digit}
                                onChange={(e) => handleCodeChange(e, index)}
                                className="code-input"
                                maxLength="1"
                            />
                        ))}
                    </div>
                    <button onClick={handleCodeSubmit} className="button button-small">Подтвердить</button>
                    <button onClick={() => setShowCodeInput(false)} className="button button-small">Отмена</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            )}

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
                <div className="details-overlay-1">
                    <button className="close-button-1" onClick={handleClose}>
                        <span>&times;</span>
                    </button>
                    <h2 className="overlay-header">Ремесленная мастерская</h2>
                    <div className="details-content">
                        <p>В ремесленной мастерской оживали традиционные народные искусства и ремесла, которые были важной частью жизни в усадьбе. Традиционный народный костюм на манекене передает дух того времени и демонстрирует мастерство и творчество.</p>
                        <audio ref={audioRef} className="overlay-audio">
                            <source src={audioFile} type="audio/mpeg"/>
                            Ваш браузер не поддерживает элемент audio.
                        </audio>
                    </div>
                </div>
            )}
            {showAudioButton && (
                <button onClick={toggleAudio} className="audio-button">
                    <img
                        src={isAudioPlaying ? pauseImage : soundImage}
                        alt={isAudioPlaying ? "Пауза" : "Воспроизвести звук"}
                        className="sound-image"
                    />
                </button>
            )}

        </div>
    );
}

export default Room3Detail;
