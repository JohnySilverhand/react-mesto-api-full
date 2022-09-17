import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup ({onUpdateUser, isOpen, onClose}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name = "edit"
      title = "Редактировать профиль"
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
      text = "Сохранить">
      <input
        id="name-input" 
        value={name || ""}
        onChange = {handleChangeName}
        type="text" 
        className= "popup__input popup__input_type_name" 
        minLength="2" 
        maxLength="30" 
        placeholder="Имя" 
        name="name" required />
      <span className="name-input-error popup__input-error" id="name-input-error"></span>
      <input 
        id="about-input"
        value={description || ""}
        onChange = {handleChangeDescription}
        type="text"
        className="popup__input popup__input_type_about"
        placeholder="Расскажите о себе"
        minLength="2"
        maxLength="200"
        name="about" required />
      <span className="about-input-error popup__input-error" id="about-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;