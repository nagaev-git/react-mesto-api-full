import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeletePlacePopup({ isOpen, onClose, onDeletePlace }) {
  const [buttonStatus, setButtonStatus] = React.useState("Да");

  const handleSubmit = (e) => {
    e.preventDefault();

    onDeletePlace(setButtonStatus);
  };

  return (
    <PopupWithForm
      name="deletePlace"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonStatus={buttonStatus}
    ></PopupWithForm>
  );
}
