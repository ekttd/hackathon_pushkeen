import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import '../css/UserHome.css';
import room1Image from '../pics/room1.png';
import room2Image from '../pics/room2.png';
import room3Image from '../pics/room3.png';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NavigationButtons from "./NavigationButtons";

function UserHome() {
    const [showMessage, setShowMessage] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleConfirmExit = () => {
        setShowConfirmation(false);
        navigate('/test');
    };

    const handleCancelExit = () => {
        setShowConfirmation(false);
    };

    useEffect(() => {
        const messageShown = localStorage.getItem('welcomeMessageShown');

        if (!messageShown) {
            setShowMessage(true);
            localStorage.setItem('welcomeMessageShown', 'true');
        }
    }, []);

    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="user-home-container">
            <Modal show={showConfirmation} onHide={handleCancelExit} dialogClassName="custom-modal">
                <Modal.Body>
                    <h2 style={{textAlign: 'center'}}>Вы уверены, что хотите завершить просмотр?</h2>
                    <div className="modal-buttons">
                        <button className="modal-button" onClick={handleConfirmExit}>Да</button>
                        <button className="modal-button" onClick={handleCancelExit}>Нет</button>
                    </div>
                </Modal.Body>
            </Modal>
            {showMessage && (
                <div className="message-overlay">
                    <div className="message-box">
                        <button className="close-button" onClick={handleCloseMessage}>×</button>
                        <h2>Добро пожаловать!</h2>
                        <p>Выберите комнату для продолжения.</p>
                    </div>
                </div>
            )}
            <h1 className="room-title">Выберите комнату</h1>
            <div className="room-gallery">
                <Slider {...settings}>
                    <div className="room" onClick={() => handleNavigate('/room1')}>
                        <img src={room1Image} alt="Комната 1" className="room-image"/>
                        <div className="room-overlay">Комната 1</div>
                    </div>
                    <div className="room" onClick={() => handleNavigate('/room2')}>
                        <img src={room2Image} alt="Комната 2" className="room-image"/>
                        <div className="room-overlay">Комната 2</div>
                    </div>
                    
                    <div className="room" onClick={() => handleNavigate('/room3')}>
                        <img src={room3Image} alt="Комната 3" className="room-image"/>
                        <div className="room-overlay">Комната 3</div>
                    </div>
                </Slider>
            </div>
            <button className="test-button" onClick={() => setShowConfirmation(true)}>
                Завершить просмотр
            </button>
            <NavigationButtons />
        </div>
    );
}

export default UserHome;
