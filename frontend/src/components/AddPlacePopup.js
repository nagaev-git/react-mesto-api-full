import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [buttonStatus, setButtonStatus] = React.useState("Сохранить");

  const inputCardNameRef = React.useRef();
  const inputCardLinkRef = React.useRef();

  React.useEffect(() => {
    inputCardNameRef.current.value = "";
    inputCardLinkRef.current.value = "";
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace(
      {
        name: inputCardNameRef.current.value,
        link: inputCardLinkRef.current.value,
      },
      setButtonStatus
    );
  };

  return (
    <PopupWithForm
      name="AddPlace"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonStatus={buttonStatus}
    >
      <input
        ref={inputCardNameRef}
        placeholder="Название"
        type="text"
        defaultValue=""
        name="inputCardName"
        className="form__input"
        id="cardname-input"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="form__error cardname-input-error"></span>

      <input
        ref={inputCardLinkRef}
        placeholder="Ссылка на картинку"
        type="url"
        defaultValue=""
        name="inputCardLink"
        className="form__input"
        id="url-input"
        required
      />
      <span className="form__error url-input-error"></span>
    </PopupWithForm>
  );
}
