// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/javascript/Home';
import Login from './components/javascript/Login';
import UserHome from './components/javascript/UserHome';
import AdminHome from './components/javascript/AdminHome';
import Register from './components/javascript/Register';
import MuseumHistory from './components/javascript/MuseumHistory';
import About from './components/javascript/About';
import RoomDetail from './components/javascript/RoomDetail'; // Импортируйте новый компонент
// Импортируйте остальные компоненты

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user" element={<UserHome />} />
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/history" element={<MuseumHistory />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/room1" element={<RoomDetail />} />
                    {/* Добавьте маршруты для других комнат */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
