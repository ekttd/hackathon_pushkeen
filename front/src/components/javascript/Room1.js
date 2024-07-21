import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Room.css'; // Подключаем CSS файл для стилизации

function Room1() {
    const [showAdminExit, setShowAdminExit] = useState(false);
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(true); // Логика для проверки, является ли пользователь администратором
    const navigate = useNavigate();

    const handleExit = () => {
        if (isAdmin) {
            setShowAdminExit(true);
        } else {
            navigate('/userhome'); // Переход для обычного пользователя
        }
    };

    const handleAdminPasswordSubmit = () => {
        if (password === 'exitpass') { // Пароль для администратора
            navigate('/userhome');
        } else {
            alert('Неверный пароль');
        }
    };

    return (
        <div className="room-container">
            <button className="back-button" onClick={handleExit}>Назад к комнатам</button>
            <div className="room-content">
                <h1>Комната 1</h1>
                <p>Добро пожаловать в Комнату 1!</p>
                {/* Здесь можно добавить больше контента для комнаты */}
            </div>
            {showAdminExit && (
                <div className="admin-exit-overlay">
                    <div className="admin-exit-box">
                        <h2>Ввод пароля</h2>
                        <input
                            type="password"
                            placeholder="Введите пароль для выхода"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                        <button onClick={handleAdminPasswordSubmit} className="main-button">Войти</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Room1;
