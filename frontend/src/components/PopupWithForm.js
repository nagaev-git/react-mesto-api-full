export default function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
      onMouseDown={(evt) => {
        evt.target === evt.currentTarget && props.onClose();
      }}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть окно"
          className="popup__toggle"
          onClick={props.onClose}
        ></button>
        <div className="form">
          <h2 className="form__title">{props.title}</h2>
          <form
            onSubmit={props.onSubmit}
            className="form__data"
            name={`form${props.name}`}
          >
            {props.children}
            <button
              name="saveFormButton"
              type="submit"
              className={`form__button form__button_enable`}
              aria-label="Сохранить ввод"
              disabled={props.isDisabled}
            >
              {props.buttonStatus}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
