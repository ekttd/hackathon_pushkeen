import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room2Detail.css';
import roomImage from '../pics/room3.png';
import overlayImage from '../pics/pralka.svg'; // Убедитесь, что путь правильный
import audioPlayIcon from '../pics/sound.svg';
import audioFile from '../audio/room2.mp3';

const FIXED_CODE = '123456';

function Room2Detail() {
    const [showDetails, setShowDetails] = useState(null);
    const [isCandleVisible, setIsCandleVisible] = useState(true);
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
        setIsCandleVisible(false);
        setShowDetails('item2');
        setShowAudioButton(true);
    };

    const handleClose = () => {
        setIsCandleVisible(true);
        setShowDetails(null);
        setShowAudioButton(false);
        if (audioRef.current) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
        }
    };

    const handleBack = () => {
        if (isAdmin) {
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
        <div className="room-detail-container">
            <button className="back-button-1" onClick={handleBack}>Назад к комнатам</button>
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
            <div className={`image-container ${isCandleVisible ? '' : 'normal-back'}`} onClick={handleCandleClick}>
                <img src={roomImage} alt="Комната" className="full-image"/>
            </div>
            {isCandleVisible && (
                <div className="large-text-rectangle-1">Третья Комната</div>
            )}
            <div className={`clickable-candle ${isCandleVisible ? '' : 'hidden'}`} onClick={handleCandleClick}>
                <img src={overlayImage} alt="Открыть детали" className="overlay-image-1"/>
            </div>
            {showDetails && (
                <div className="details-overlay-1">
                    <button className="close-button-1" onClick={handleClose}>
                        <span>&times;</span>
                    </button>
                    <h2 className="overlay-header">Третья Комната</h2>
                    <div className="details-content">
                        <p>Эта комната оформлена в стиле модерн с элементами ар-деко. Вы увидите шикарные диваны, изысканные светильники и современные аксессуары. Окна с великолепным видом на сад и теплые, уютные текстуры создают атмосферу комфорта и стиля. Большая картина на стене добавляет драматизма в интерьер.</p>
                        <audio ref={audioRef} className="overlay-audio">
                            <source src={audioFile} type="audio/mpeg"/>
                            Ваш браузер не поддерживает элемент audio.
                        </audio>
                    </div>
                </div>
            )}
            {showAudioButton && (
                <button className="audio-button" onClick={toggleAudio}>
                    <img src={audioPlayIcon} alt={isAudioPlaying ? 'Pause Audio' : 'Play Audio'} />
                </button>
            )}
        </div>
    );
}

export default Room2Detail;
