import logo from "../images/header/logo.svg";

export default function Header({
  loggedIn,
  textButton,
  userEmail,
  headerHandler,
}) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип проекта" className="header__logo" />
      <div className="header__info-block">
        <p className="header__user-email">{userEmail || ""}</p>
        <button
          aria-label={textButton}
          className={
            loggedIn
              ? "header__universal-button header__universal-button_color_grey"
              : "header__universal-button"
          }
          onClick={headerHandler}
        >
          {textButton}
        </button>
      </div>
    </header>
  );
}
