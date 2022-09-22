import React from "react";

function PopupWithForm({name, title, children, text, isOpen, onClose, onSubmit}) {
  return (
    <div className={`popup popup_${name} ${(isOpen? 'popup_opened':'')}`}>
      <div className="popup__container">
        <h3 className="popup__header">{title}</h3>
        <button className="popup__close-button popup__close-button_edit" type="button" onClick={onClose}></button>
        <form className="popup__form" id="edit" name={name} noValidate onSubmit={onSubmit}>
            {children}
            <button className="popup__form-submit popup__form-submit_profile" type="submit">{text}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;