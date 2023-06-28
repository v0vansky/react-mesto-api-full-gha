import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 
    
    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="edit-profile" title={'Редактировать профиль'} buttonText='Сохранить'>
            <div className="popup__input-container">
              <input type="text" id="name-input" value={name || ""} onChange={(e) => {setName(e.target.value)}} name="inputName" className="popup__input popup__input_type_name" placeholder="Имя" minLength="2" maxLength="40" required />
              <span className="popup__error name-input-error"></span>
            </div>
            <div className="popup__input-container">
              <input type="text" id="about-input" value={description || ""} onChange={(e) => {setDescription(e.target.value)}} name="inputAbout" className="popup__input popup__input_type_about" placeholder="О себе" minLength="2" maxLength="200" required />
              <span className="popup__error about-input-error"></span>
            </div>
        </PopupWithForm>
    )
};

export default EditProfilePopup;