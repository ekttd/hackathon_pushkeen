import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import '../css/UserHome.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import room1Image from '../pics/room1.png';
import room2Image from '../pics/room2.png';
import room3Image from '../pics/room3.png';
import NavigationButtons from './NavigationButtons';

function UserHome() {
    const [showMessage, setShowMessage] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const messageShown = localStorage.getItem('welcomeMessageShown');
        const adminStatus = localStorage.getItem('isAdmin');
        setIsAdmin(adminStatus === 'false');

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

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <div className="slick-arrow slick-next" />,
        prevArrow: <div className="slick-arrow slick-prev" />,
    };

    return (
        <div className="admin-home-container">
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
            <Slider {...sliderSettings} className="room-gallery">
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
            <button className="test-button" onClick={() => navigate('/accept')}>
                Завершить просмотр
            </button>
            <NavigationButtons/>
        </div>
    );
}

export default UserHome;
