import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const [buttonStatus, setButtonStatus] = React.useState("Сохранить");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser(
      {
        name,
        about: description,
      },
      setButtonStatus
    );
  };

  return (
    <PopupWithForm
      name="EditProfile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonStatus={buttonStatus}
    >
      <input
        onChange={handleChangeName}
        type="text"
        value={name || ''}
        placeholder="Имя"
        name="name"
        className="form__input"
        id="name-input"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="form__error name-input-error"></span>
      <input
        onChange={handleChangeDescription}
        type="text"
        value={description || ''}
        name="about"
        placeholder="Обо мне"
        className="form__input"
        id="subname-input"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="form__error subname-input-error"></span>
    </PopupWithForm>
  );
}
