// src/components/javascript/About.js
import React from 'react';
import '../css/About.css';
import NavigationButtons from './NavigationButtons';
function About() {
    const handleToggle = (event) => {
        const content = event.currentTarget.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
    };

    return (
        <div className="about-container">
            <h1 className="title">О нас</h1>
            <div className="about-section">
                <button className="collapsible-about" onClick={handleToggle}>Режим работы</button>
                <div className="content">
                    <p>Вторник - Воскресенье:</p>
                    <p>10:00 - 17:00 (Касса до 16:30)</p>
                    <p>Выходной день - Понедельник</p>
                </div>
            </div>
            <div className="about-section">
                <button className="collapsible-about" onClick={handleToggle}>Стоимость билетов</button>
                <div className="content">
                    <p>Взрослый билет (от 18 лет) - 120 рублей</p>
                    <p>Детский билет - бесплатно</p>
                </div>
            </div>
            <div className="about-section">
                <button className="collapsible-about" onClick={handleToggle}>Контакты</button>
                <div className="content">
                    <p>E-mail: mus_agency_obl@lenoblmus.ru</p>
                    <p>Приёмная: 8 812 579 57 22</p>
                    <p>Директор: Леся Анатольевна Колесникова</p>
                </div>
            </div>
            <div className="about-section">
                <button className="collapsible-about" onClick={handleToggle}>Видео об усадьбе</button>
                <div className="content">
                    <div className="video-wrapper">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/-f4nldm53GE"
                            title="Видео 1"
                            style={{ border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/dXhd2yTAlNQ"
                            title="Видео 2"
                            style={{ border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/Kvj9ToooQrk"
                            title="Видео 3"
                            style={{ border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="museum-details">
                <div className="museum-address">
                    <h2>Адрес</h2>
                    <p>Санкт-Петербург, ул. Смольного, д.3</p>
                </div>
            </div>
            <NavigationButtons />
        </div>
    );
}

export default About;