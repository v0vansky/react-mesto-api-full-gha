import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]); 

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="avatar" title={'Обновить аватар'} buttonText='Сохранить'>
            <div className="popup__input-container">
              <input type="url" id="avatar-input" name="inputAvatar" ref={avatarRef} className="popup__input popup__input_type_avatar" placeholder="Ссылка на картинку" required />
              <span className="popup__error avatar-input-error"></span>
            </div>
        </PopupWithForm>
    )
};

export default EditAvatarPopup;