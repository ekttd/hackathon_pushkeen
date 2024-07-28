// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import buildingImage from '../pics/building.jpg'; // Импортируем изображение

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [redirectTo, setRedirectTo] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            setRedirectTo('/admin');
        } else {
            setRedirectTo('/user');
        }
        setIsLoggedIn(true);
    };

    useEffect(() => {
        if (isLoggedIn) {
            const timer = setTimeout(() => {
                navigate(redirectTo);
            }, 5000); // Задержка в 3 секунды для завершения анимации

            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate, redirectTo]);

    return (
        <div className="login-container">
            <div className={`login-form ${isLoggedIn ? 'fade-out' : ''}`}>
                <h1>Авторизация</h1>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Войти</button>
            </div>
            {isLoggedIn && (
                <div className="building-image-container">
                    <img src={buildingImage} alt="Building" className="building-image" />
                </div>
            )}
        </div>
    );
}

export default Login;