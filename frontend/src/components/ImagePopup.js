function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_image-zoom ${card.name ? 'popup_opened' : ''}`}>
            <div className="popup__image-container">
                <img src={card.link} className="popup__image" alt={card.name}/>
                <p className="popup__image-name">{card.name}</p>
                <button type="button" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;