// src/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст пользователя
const UserContext = createContext();

// Компонент-провайдер для контекста
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ code: '' });

    useEffect(() => {
        // Инициализация кода пользователя из localStorage
        const storedCode = localStorage.getItem('userCode');
        if (storedCode) {
            setUser({ code: storedCode });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Хук для использования контекста
export const useUser = () => useContext(UserContext);
