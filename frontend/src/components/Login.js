import React from "react";
import AuthComponent from "./AuthComponent";

export default function Login({ headerHandler, handlerLogin }) {
  return (
    <AuthComponent
      isLogin={true}
      headerHandler={headerHandler}
      handlerSubmit={handlerLogin}
      title={"Вход"}
      buttonTitle={"Войти"}
    />
  );
}
