import React from "react";

function InfoTooltip ({isOpen, onClose, image, text}) {
  return (
    <section className={`popup ${(isOpen? 'popup_opened' : '')}`}>
      <div className="popup__container">
        <button 
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img className="infotool__image" alt="info" src={image} />
        <h2 className="infotool__text">{text}</h2>
      </div>
    </section>
  )
}

export default InfoTooltip;