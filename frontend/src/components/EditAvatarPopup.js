import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonStatus, setButtonStatus] = React.useState("Сохранить");

  const inputRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar(
      {
        avatar: inputRef.current.value,
      },
      setButtonStatus,
      inputRef.current
    );
  };

  return (
    <PopupWithForm
      name="EditAvatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonStatus={buttonStatus}
    >
      <input
        ref={inputRef}
        placeholder="Ссылка на картинку"
        type="url"
        defaultValue=""
        name="avatar"
        className="form__input"
        id="avatar-url-input"
        required
      />
      <span className="form__error avatar-url-input-error"></span>
    </PopupWithForm>
  );
}
