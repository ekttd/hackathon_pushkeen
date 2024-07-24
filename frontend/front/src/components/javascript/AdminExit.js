import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminExit.css'; // Подключаем CSS файл для стилизации

function AdminExit() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlePasswordSubmit = () => {
        if (password === 'exitpass') { // Пароль для администратора
            navigate('/userhome');
        } else {
            alert('Неверный пароль');
        }
    };

    return (
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
                <button onClick={handlePasswordSubmit} className="main-button">Войти</button>
            </div>
        </div>
    );
}

export default AdminExit;
