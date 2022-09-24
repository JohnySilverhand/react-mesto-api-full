import React from "react";

function ImagePopup ({card, close}) {
  return (
		<div className={`popup popup_open-image ${(card.link && 'popup_opened')}`}>
      <div className="popup__image-container">
        <img className="popup__image" alt={card.name} src = {card.link} />
        <p className="popup__image-text">{card.name}</p>
        <button className="popup__close-button popup__close-button_image" type="button" onClick={close}></button>
      </div>
    </div>
	); 
}

export default ImagePopup;