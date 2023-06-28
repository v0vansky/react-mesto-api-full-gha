import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }
    
    return (
        <div className="element">
            <img src={card.link} className="element__image" alt={card.name} onClick={handleClick}/>
            <div className="element__info">
                <h3 className="element__text">{card.name}</h3>
                <button type="button" onClick={handleLikeClick} className={`element__like-button ${isLiked && 'element__like-button_active'}`}>
                    <div className="element__like-counter">{card.likes.length}</div>
                </button>
            </div>
            {isOwn && <button type="button" className="element__remove-button" onClick={handleDeleteClick} />}
        </div>
    )
}

export default Card;