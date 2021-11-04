import { useState } from "react";
import Header from "./Header";

export default function AuthComponent({
  isLogin,
  headerHandler,
  handlerSubmit,
  title,
  buttonTitle,
  children,
}) {
  //Стейт для сбора данных с формы
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //Обработчик сбора данных с инпутов
  const handleChange = (e) => {
    //Вытаскиваем из таргета имя поля и значение
    const { name, value } = e.target;
    //Обновляем стейт с данным
    setData({
      ...data,
      [name]: value,
    });
  };

  //Обработчик сабмита формы
  const formSubmitHandler = (event) => {
    event.preventDefault();
    handlerSubmit(data.password, data.email);
  };
  return (
    <>
      <Header
        textButton={isLogin ? "Регистрация" : "Войти"}
        headerHandler={headerHandler}
      />
      <section className="auth">
        <h1 className="auth__header">{title}</h1>
        <form
          onSubmit={formSubmitHandler}
          name="authorization"
          className="auth__form"
        >
          <input
            type="email"
            name="email"
            id="email-input-login"
            className="auth__input"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password-input-login"
            className="auth__input"
            placeholder="Пароль"
            value={data.password}
            onChange={handleChange}
            required
          />
          <button
            aria-label={buttonTitle}
            type="submit"
            className={`auth__button`}
          >
            {buttonTitle}
          </button>
          {children}
        </form>
      </section>
    </>
  );
}
