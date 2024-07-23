import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/UserHome.css';
import room1Image from '../pics/room1.png';
import room2Image from '../pics/room2.png';
import room3Image from '../pics/room3.png';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserHome() {
    const [showMessage, setShowMessage] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
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
        const adminStatus = localStorage.getItem('isAdmin');
        setIsAdmin(adminStatus === 'true');

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

    return (
        <div className="user-home-container">
            <Modal show={showConfirmation} onHide={handleCancelExit} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Подтверждение завершения просмотра</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Вы уверены, что хотите завершить просмотр?</h2>
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
            <h1>Выберите комнату</h1>
            <div className="room-gallery">
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
            </div>
            {isAdmin && (
                <button className="admin-exit-button" onClick={() => navigate('/admin')}>
                    Администраторский режим
                </button>
            )}
            <button className="test-button" onClick={() => setShowConfirmation(true)}>
                Завершить просмотр
            </button>
        </div>
    );
}

export default UserHome;
