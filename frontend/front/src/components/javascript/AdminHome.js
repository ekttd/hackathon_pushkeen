// src/components/AdminHome.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminHome.css';

function AdminHome() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleExit = () => {
        if (password === 'exitpass') {
            navigate('/');
        } else {
            alert('Неверный пароль');
        }
    };

    return (
        <div className="admin-home-container">
            <h1>Комната администратора</h1>
            <input
                type="password"
                placeholder="Введите пароль для выхода"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleExit}>Выйти</button>
        </div>
    );
}

export default AdminHome;
