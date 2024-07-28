import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room1Detail.css';
import roomImage from '../pics/room1.jpeg';
import overlayImage from '../pics/balal.png';
import audioPlayIcon from '../pics/sound.svg'; // Используем одну иконку для воспроизведения и паузы
import audioFile from '../audio/room1.mp3';

const FIXED_CODE = '123456';

function Room1Detail() {
    const [showDetails, setShowDetails] = useState(null);
    const [isBalalaVisible, setIsBalalaVisible] = useState(true);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [showAudioButton, setShowAudioButton] = useState(false);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const handleBalalaClick = () => {
        setIsBalalaVisible(false);
        setShowDetails('item1');
        setShowAudioButton(true);
    };

    const handleClose = () => {
        setIsBalalaVisible(true);
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
            <button className="button back-button-1" onClick={handleBack}>Назад к комнатам</button>
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
            <div className={`image-container ${isBalalaVisible ? '' : 'normal-back'}`} onClick={handleBalalaClick}>
                <img src={roomImage} alt="Комната" className="full-image"/>
            </div>
            {isBalalaVisible && (
                <div className="large-text-rectangle-1">Гостиная</div>
            )}
            <div className={`clickable-balal ${isBalalaVisible ? '' : 'hidden'}`} onClick={handleBalalaClick}>
                <img src={overlayImage} alt="Открыть детали" className="overlay-image-1"/>
            </div>
            {showDetails && (
                <div className="details-overlay-1">
                    <button className="close-button-1" onClick={handleClose}>
                        <span>&times;</span>
                    </button>
                    <div className="details-content">
                        <h2>Комната для гостей</h2>
                        <p>Здесь вы видите мебель конца XVIII века, включая элегантный диван и кресла с зелеными подушками, отражающие стиль и комфорт той эпохи. Домра на диване напоминает о любви семьи к музыке и искусству. Картина на мольберте и добавляют нотки природы и вдохновения в интерьер комнаты. Туалетный столик с зеркалом и кружевной салфеткой создают атмосферу уюта и спокойствия.</p>
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

export default Room1Detail;
