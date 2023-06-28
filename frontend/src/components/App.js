import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { api } from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from "../utils/auth";

import Header from "./Header";
import Main from "./Main";
import Login from './Login';
import Register from './Register';
import Footer from "./Footer";

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from "./ImagePopup";
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const navigate = useNavigate();

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then(res => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/", { replace: true });
        }
      }).catch((err) => {
        setIsInfoTooltipOpen(true);
        setRegisterSuccess(false);
        console.log(err);
      })
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((err) => {
          setIsInfoTooltipOpen(true);
          setRegisterSuccess(false);
          console.log(err);
        })
    }
  }, [loggedIn]);

  const isAnyPopupOpen = 
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isInfoTooltipOpen ||
    selectedCard.link

  React.useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isAnyPopupOpen) {
      document.addEventListener("keydown", closeByEsc)
      return () => {
        document.removeEventListener("keydown", closeByEsc)
      }
    }
  }, [isAnyPopupOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true); 
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      setRegisterSuccess(false);
      console.log(err);
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups();
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      setRegisterSuccess(false);
      console.log(err);
    })
  }

  function handleUpdateUser(data) {
    api.patchUserInfo(data)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      setRegisterSuccess(false);
      console.log(err);
    })
  }

  function handleUpdateAvatar(data) {
    api.patchAvatar(data)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      setRegisterSuccess(false);
      console.log(err);
    })
  }

  function handleAddPlace(newCard) {
    api.postCard(newCard)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups();
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      setRegisterSuccess(false);
      console.log(err);
    })
  }
  
  function handleLogin(email, password) {
    auth.authorize(email, password)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      setLoggedIn(true);
      setUserEmail(email);
      navigate('/');
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      setRegisterSuccess(false);
      console.log(err);
    })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
    .then((res) => {
      setIsInfoTooltipOpen(true);
      setRegisterSuccess(true);
      navigate('/sign-in');
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      setRegisterSuccess(false);
      console.log(err);
    })
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail('');
    navigate("/sign-in", {replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header loggedIn={loggedIn} userEmail={userEmail} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards = {cards}
              />
            } />
            <Route path="/sign-up" element={
              <Register onRegister={handleRegister} />
            } />
            <Route path="/sign-in" element={
              <Login onLogin={handleLogin} />
            } />
            <Route path="*" element={ loggedIn ? (<Navigate to="/" replace />) : (<Navigate to="sign-in" replace />)} />
          </Routes>
          <Footer/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} successMessage={'Вы успешно зарегистрировались!'} failMessage={'Что-то пошло не так! Попробуйте ещё раз.'} success={registerSuccess} />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;