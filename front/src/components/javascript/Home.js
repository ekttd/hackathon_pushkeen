import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import logo from '../pics/logo.png';
import museumLogo from '../pics/logo2.png';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="header">
                <div className="header-content">
                    <img src={logo} alt="PushKeen" className="logo" />
                    <img src={museumLogo} alt="Музейное Агентство" className="museum-logo" />
                </div>
            </div>
            <div className="main-buttons">
                <button className="main-button" onClick={() => navigate('/register')}>Начать путешествие</button>
                <button className="secondary-button" onClick={() => navigate('/history')}>История музея</button>
                <button className="secondary-button" onClick={() => navigate('/about')}>О нас</button>
            </div>
            <div className="background-elements"></div>
        </div>
    );
}
export default Home;
