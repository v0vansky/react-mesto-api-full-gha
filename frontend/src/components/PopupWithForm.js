function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form name={props.name} onSubmit={props.onSubmit} className={`popup__form popup__form_type_${props.name}`}>
                    {props.children}
                    <button type="submit" className="popup__save-button">{props.buttonText}</button>
                </form>
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;