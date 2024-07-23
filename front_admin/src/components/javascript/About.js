// src/components/javascript/About.js
import React from 'react';
import '../css/About.css'; // Проверьте, что путь к CSS-файлу верный

function About() {
    return (
        <div className="about-container">
            <h1>О нас</h1>
            <div className="content">
                <p>Здесь вы можете узнать больше о нашем сайте. Мы стремимся предоставлять лучший опыт для наших пользователей, предлагая интересные и увлекательные материалы.</p>
                <p>Наш сайт был создан с целью познакомить вас с культурным наследием и предоставить возможность исследовать различные выставки и экспонаты.</p>
                <p>Мы надеемся, что наш сайт принесет вам много полезной информации и приятных впечатлений.</p>
                <p>Присоединяйтесь к нам в этом увлекательном путешествии по миру искусства и культуры!</p>
            </div>
        </div>
    );
}

export default About;