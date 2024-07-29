import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room2Detail.css';
import roomImage from '../pics/room2.png';
import overlayImage from '../pics/candle.png';
import pauseImage from "../pics/pause.svg"; 
import audioFile from '../audio/room2.mp3';
import soundImage from "../pics/sound.svg";
const FIXED_CODE = '123456';


function Room2Detail() {
    const [isCandleVisible, setisCandleVisible] = useState(true);
    const [showDetails, setShowDetails] = useState(null);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [showAudioButton, setShowAudioButton] = useState(false);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const handleCandleClick = () => {
        setisCandleVisible(false);
        setShowDetails('item1');
        setShowAudioButton(true);
    };

    const handleClose = () => {
        setisCandleVisible(true);
        setShowDetails(null);
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
        <div className={`room-detail-container-2`}>
            <button className="back-button-2" onClick={handleBack}>Назад к комнатам</button>

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
                <div className="details-overlay-1">
                    <button className="close-button-1" onClick={handleClose}>
                        <span>&times;</span>
                    </button>
                    <h2 className="overlay-header">Музыкальная гостиная</h2>
                    <div className="details-content">
                        <p>Эта комната была центром культурной жизни семьи, где часто устраивались музыкальные вечера и литературные чтения. Перед вами старинный рояль, изготовленный в конце XVIII века, на котором, возможно, играли классические произведения того времени.</p>
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

export default Room2Detail;
