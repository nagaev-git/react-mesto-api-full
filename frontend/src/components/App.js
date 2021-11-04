import React, { useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoTooltip";
import * as auth from "../utils/Auth";

export default function App() {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isCardImpPopupOpen, setIsCardImpPopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isSuccessRegister, setIsSuccessRegister] = React.useState(false);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => console.log(err));

    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (setButtonStatus) => {
    setButtonStatus("Удаление...");

    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setButtonStatus("Да"));
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateUser = (newUserInfo, setButtonStatus) => {
    setButtonStatus("Сохранение...");

    api
      .editUserProfile(newUserInfo)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setButtonStatus("Сохранить"));
  };

  const handleUpdateAvatar = (newAvatar, setButtonStatus, input) => {
    setButtonStatus("Сохранение...");

    api
      .editUserAvatar(newAvatar)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setButtonStatus("Сохранить");
        input.value = "";
      });
  };

  const handleAddPlaceSubmit = (
    newCard,
    setButtonStatus,
  ) => {
    setButtonStatus("Сохранение...");

    api
      .addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setButtonStatus("Сохранить");
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setIsCardImpPopupOpen(true);
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setIsDeletePlacePopupOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardImpPopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsRegisterPopupOpen(false);
    setSelectedCard({});
  };

  const headerButtonHandlerSignIn = () => {
    history.push("/sign-up");
  };

  const headerButtonHandlerSignUp = () => {
    history.push("/sign-in");
  };

  const headerButtonHandlerMain = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res.data.email) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLogin = (password, email) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setEmail(email);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then((data) => {
        if (data.data.email) {
          setIsSuccessRegister(true);
          setIsRegisterPopupOpen(true);
        }
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessRegister(false);
        setIsRegisterPopupOpen(true);
      });
  };

  // const onSignOut = () => {};

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>
            <Route path="/sign-up">
              <Register
                headerHandler={headerButtonHandlerSignUp}
                handlerRegister={handleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                headerHandler={headerButtonHandlerSignIn}
                handlerLogin={handleLogin}
              />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              headerHandler={headerButtonHandlerMain}
              email={email}
            />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <DeletePlacePopup
            isOpen={isDeletePlacePopupOpen}
            onClose={closeAllPopups}
            onDeletePlace={handleCardDelete}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isCardImpPopupOpen}
            onClose={closeAllPopups}
          />
          <InfoToolTip
            isOpen={isRegisterPopupOpen}
            onClose={closeAllPopups}
            isSucces={isSuccessRegister}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
