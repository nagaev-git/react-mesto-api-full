import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  headerHandler,
  email,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        loggedIn={true}
        textButton={"Выйти"}
        userEmail={email}
        headerHandler={headerHandler}
      />
      <main className="main">
        <section className="profile">
          <div className="profile__overlay" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__image"
            />
          </div>
          <div className="profile__items">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__job">{currentUser.about}</p>
            </div>
            <div className="profile__button">
              <button
                type="button"
                aria-label="Редактировать профиль"
                className="profile__button-edit"
                onClick={onEditProfile}
              ></button>
              <button
                type="button"
                aria-label="Добавить карточку"
                className="profile__button-add"
                onClick={onAddPlace}
              ></button>
            </div>
          </div>
        </section>
        <section className="cards">
          <ul className="cards__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
