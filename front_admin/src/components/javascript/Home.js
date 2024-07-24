import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import logo from '../pics/logo.png';
import museumLogo from '../pics/logo2.png';

function Home() {
    const navigate = useNavigate();

    const handleStartJourney = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/add_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Код администратора: ${data.code}`);
                navigate('/register');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Ошибка при добавлении администратора.');
            }
        } catch (error) {
            alert('Ошибка при соединении с сервером.');
        }
    };

    return (
        <div className="home-container">
            <div className="header">
                <div className="header-content">
                    <img src={logo} alt="PushKeen" className="logo" />
                    <img src={museumLogo} alt="Музейное Агентство" className="museum-logo" />
                </div>
            </div>
            <div className="main-buttons">
                <button className="main-button" onClick={handleStartJourney}>Начать путешествие</button>
                <button className="secondary-button" onClick={() => navigate('/history')}>История музея</button>
                <button className="secondary-button" onClick={() => navigate('/about')}>О нас</button>
            </div>
            <div className="background-elements"></div>
        </div>
    );
}

export default Home;
