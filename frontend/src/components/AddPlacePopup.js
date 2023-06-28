import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [place, setPlace] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setPlace('');
        setLink('');
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: place,
            link,
        })
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="add-place" title={'Новое место'} buttonText='Создать'>
            <div className="popup__input-container">
              <input type="text" id="place-input" value={place} onChange={(e) => {setPlace(e.target.value)}} name="inputPlace" className="popup__input popup__input_type_place" placeholder="Название" minLength="2" maxLength="40" required />
              <span className="popup__error place-input-error"></span>
            </div>
            <div className="popup__input-container">
              <input type="url" id="url-input" value={link} onChange={(e) => {setLink(e.target.value)}} name="inputUrl" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required />
              <span className="popup__error url-input-error"></span>
            </div>
          </PopupWithForm>
    )
}

export default AddPlacePopup;