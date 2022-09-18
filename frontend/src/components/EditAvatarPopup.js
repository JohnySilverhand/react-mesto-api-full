import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatar = React.useRef('');

  function handleChangeAvatar() {
    return avatar.current.value;
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  React.useEffect(() => {
    avatar.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name = "avatar"
      title = "Обновить аватар"
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
      text = "Сохранить">
      <input
        ref={avatar}
        onChange = {handleChangeAvatar}
        type="url"
        id="avatar-input"
        placeholder="Ссылка на аватар"
        name="avatar"
        className="popup__input popup__input_type_avatar" required/>
      <div className="popup_avatar__span"></div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;