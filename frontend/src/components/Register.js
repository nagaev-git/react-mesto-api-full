import React from "react";
import AuthComponent from "./AuthComponent";
import { Link } from "react-router-dom";

export default function Register({ headerHandler, handlerRegister }) {
  return (
    <AuthComponent
      isLogin={false}
      headerHandler={headerHandler}
      handlerSubmit={handlerRegister}
      title={"Регистрация"}
      buttonTitle={"Зарегестрироваться"}
    >
      {
        <p className="auth__answer-text">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="auth__link">
            Войти
          </Link>
        </p>
      }
    </AuthComponent>
  );
}
