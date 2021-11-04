export default function ImagePopup(props) {
  return (
    <div
      className={`popup popup_show-image ${props.isOpen ? "popup_opened" : ""}`}
      onClick={(evt) => {
        evt.target === evt.currentTarget && props.onClose();
      }}
    >
      <div className="popup__container">
        <button
          name="closePopupButton"
          type="button"
          className="popup__toggle"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <figure className="image">
          <img
            src={props.card.link}
            alt={props.card.name}
            className="image__item"
          />
          <figcaption className="image__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
