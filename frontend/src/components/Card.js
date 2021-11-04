import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const hanldeClick = () => {
    props.onCardClick(props.card);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  return (
    <li className="card">
      <button
        onClick={handleDeleteClick}
        className={`card__delete ${isOwn ? "card__delete_visible" : ""}`}
        type="button"
      ></button>
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={hanldeClick}
      />
      <h2 className="card__title">{props.card.name}</h2>
      <div className="card__like-container">
        <button
          onClick={handleLikeClick}
          className={`card__like ${isLiked ? "card__like_active" : ""}`}
          type="button"
          aria-label="Нравится"
        ></button>
        <p className="card__like-counter">{props.card.likes.length}</p>
      </div>
    </li>
  );
}
