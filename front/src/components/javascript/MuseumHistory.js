import React from 'react';
import '../css/MuseumHistory.css';
import galleryImage1 from '../pics/room1.png';
import galleryImage2 from '../pics/room2.png';
import galleryImage3 from '../pics/room3.png';

function MuseumHistory() {
    const handleToggle = (event) => {
        const content = event.currentTarget.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
    };

    return (
        <div className="museum-history-container">
            <h1 className="title">История музея</h1>
            <div className="history-section">
                <button className="collapsible" onClick={handleToggle}>Основание музея</button>
                <div className="content">
                    <p>
                        Музейное агентство было основано в 1990 году. Его миссия — сохранить и популяризировать культурное наследие нашей области.
                        С момента основания музей проводит множество выставок, научных исследований и образовательных программ.
                    </p>
                </div>
            </div>
            <div className="history-section">
                <button className="collapsible" onClick={handleToggle}>Коллекция</button>
                <div className="content">
                    <p>
                        В музее представлены экспонаты различных эпох и направлений, от древности до современности.
                        Здесь можно найти уникальные артефакты, произведения искусства и исторические документы, которые рассказывают об истории и культуре нашего региона.
                    </p>
                </div>
            </div>
            <div className="history-section">
                <button className="collapsible" onClick={handleToggle}>Выставки</button>
                <div className="content">
                    <p>
                        Музей проводит множество выставок, посвящённых различным темам и эпохам. Каждая выставка тщательно подготовлена и предлагает посетителям уникальную возможность
                        окунуться в мир искусства и истории.
                    </p>
                </div>
            </div>
            <div className="gallery-section">
                <h2>Галерея</h2>
                <div className="gallery">
                    <img src={galleryImage1} alt="Gallery Image 1" className="gallery-image" />
                    <img src={galleryImage2} alt="Gallery Image 2" className="gallery-image" />
                    <img src={galleryImage3} alt="Gallery Image 3" className="gallery-image" />
                </div>
            </div>+
        </div>
    );
}

export default MuseumHistory;
