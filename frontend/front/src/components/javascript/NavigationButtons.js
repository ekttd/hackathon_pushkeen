// src/components/javascript/NavigationButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from '../pics/back-arrow.png';
import homeIcon from '../pics/home-icon.png';
import '../css/NavigationButtons.css';

function NavigationButtons() {
    const navigate = useNavigate();

    return (
        <div className="navigation-buttons">
            <button onClick={() => navigate(-1)} className="nav-button nav-button-left">
                <img src={backArrow} alt="Назад" />
            </button>
            <button onClick={() => navigate('/')} className="nav-button nav-button-right">
                <img src={homeIcon} alt="На главную" />
            </button>
        </div>
    );
}

export default NavigationButtons;
