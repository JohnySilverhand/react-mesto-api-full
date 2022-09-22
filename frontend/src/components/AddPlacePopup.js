import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [place, setPlace] = React.useState('');
  const [url, setUrl] = React.useState('');

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeUrl(e) {
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: place,
      link: url
    })
  }

  React.useEffect(() => {
    setPlace('');
    setUrl('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      text="Создать">
      <input 
        onChange={handleChangePlace}
        value={place || ""}
        id="title-input" 
        type="text" 
        className="popup__input  popup__input_type_header"  
        minLength="2"
        maxLength="30"
        placeholder="Название"
        name="name" required />
      <span className="title-input-error popup__input-error" id="title-input-error"></span>
      <input
        value={url || ""} 
        onChange={handleChangeUrl}
        id="link-input"
        className="popup__input  popup__input_type_src"
        type="url"
        placeholder="Ссылка на картинку"
        name="link" required />
        <span className="link-input-error popup__input-error" id="link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;