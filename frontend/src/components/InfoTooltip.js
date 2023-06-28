import React from "react";
import SuccessIcon from "../images/success.svg";
import FailIcon from "../images/fail.svg";

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                {props.success ? (
                    <>
                        <img src={`${SuccessIcon}`} className="popup__icon" alt="успех!" />
                        <h2 className="popup__tooltip-message">{props.successMessage}</h2>
                    </>
                ) : (
                    <>
                        <img src={`${FailIcon}`} className="popup__icon" alt="провал :(" />
                        <h2 className="popup__tooltip-message">{props.failMessage}</h2>
                    </>
                )
                }
                <button type="button" className="popup__close-button" onClick={props.onClose} />
            </div>
        </div>
    )
}

export default InfoTooltip;