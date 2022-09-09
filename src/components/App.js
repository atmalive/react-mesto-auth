import React, { useEffect, useState } from 'react'
import {Route, Switch, useHistory} from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import {Header} from './Header'
import {Main} from './Main'
import {Footer} from './Footer'
import {ImagePopup} from "./ImagePopup";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {ConfirmDeleteCardPopup} from "./ConfirmDeleteCardPopup";
import {ProtectedRoute} from "./ProtectedRoute";
import {Login} from "./Login";
import {Register} from "./Register";
import {InfoTooltip} from "./InfoTooltip";
import {authentication, register, signin} from "./MestoAuth";

export default function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser ] = useState();
    const [isButtonBlocked, setIsButtonBlocked] = useState(false);
    const [cards, setCards] = useState([]);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [ email, setEmail] = useState('')
    const [ isRegisterError, setIsRegisterError ] = useState(false)

    const history = useHistory()

    const signOut = () => {
        localStorage.removeItem('token')
        setLoggedIn(false)
        setEmail('')
        history.push('/sign-in')
    }

      useEffect( () => {
        const token = localStorage.getItem('token')

          if (token) {
              authentication(token)
                  .then((data) =>{
                      if (data) {
                          setEmail(data.data.email)
                          setLoggedIn(true)
                          history.push('/')
                      }
                  })
          }
    }, [])

    useEffect(() => {
        if (loggedIn) {
            api.getUserInfo()
                .then((userInfo) => {
                    setCurrentUser(userInfo)
                })
                .catch(err => {
                    console.log(err);
                });
            api.getInitialCards()
                .then((cardsItems) => {
                    setCards(cardsItems)
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [loggedIn])

    const handleCardLike = (card) => {
        const isLiked = card.likes.some( card => card._id === currentUser._id)
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleCardDelete = () => {
        api.deleteCard(selectedCard._id)
            .then(() => {
                const newArr = cards.filter( (cardItem) => cardItem._id !== selectedCard._id)
                setCards(newArr)
                closeAllPopups()
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    }
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    }
    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const handleUpdateUser = ({name, about}) => {
        setIsButtonBlocked(true)
        api.updateUserInfo(name, about)
        .then((data) => {
            setCurrentUser(data)
            closeAllPopups()
        })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsButtonBlocked(false)
            })
    }

    const handleUpdateAvatar = ({avatar}) => {
        setIsButtonBlocked(true)
        api.updateAvatar(avatar)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsButtonBlocked(false)
            })
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(null)
        setIsImagePopupOpen(false)
        setIsConfirmDeletePopupOpen(false)
        setIsInfoTooltipOpen(false)
        setIsRegisterError(false)
    }

    const handleAddPlaceSubmit = (name, link) => {
        setIsButtonBlocked(true)
          api.addCard(name,link)
              .then((data) => {
                  setCards([data, ...cards]);
                  closeAllPopups()
              })
              .catch(err => {
                  console.log(err);
              })
              .finally(() => {
                  setIsButtonBlocked(false)
              })
    }

    const regPerson = (email, password) => {
        register(email, password)
            .then((data) => {
                setIsRegisterError(false)
                setIsInfoTooltipOpen(true)
            })
            .catch((err) => {
                setIsRegisterError(true)
                setIsInfoTooltipOpen(true)
                console.log(err)
            })
    }

    const signPerson = (email, password) => {
        signin(email, password)
            .then((data) => {
                setLoggedIn(true)
                history.push('/')
                localStorage.setItem('token', data.token)
                setEmail(email)
            })
            .catch((err) => console.log(err))
    }

    return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
              <Header  isAuthtorized={loggedIn} email={email} signOut={signOut}/>
              <Switch>
                  <Route path='/sign-in'>
                      <Login onSubmit={signPerson} />
                  </Route>

                  <Route path='/sign-up'>
                      <Register onSubmit={regPerson} />
                  </Route>

                  <ProtectedRoute
                      exact path="/"
                      loggedIn={loggedIn}
                      component={Main}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      onEditProfile={handleEditProfileClick}
                      onEditAvatar={handleEditAvatarClick}
                      onAddPlace ={handleAddPlaceClick}
                      isEditProfilePopupOpen={isEditProfilePopupOpen}
                      isAddPlacePopupOpen={isAddPlacePopupOpen}
                      isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                      closeAllPopups={closeAllPopups}
                      handleCardClick={handleCardClick}
                      isConfirmDeletePopupOpen={isConfirmDeletePopupOpen}
                      setIsConfirmDeletePopupOpen={setIsConfirmDeletePopupOpen}
                      isImagePopupOpen={isImagePopupOpen}
                      setIsImagePopupOpen={setIsImagePopupOpen}/>
              </Switch>
                  <Footer />
                  <ImagePopup
                      card={selectedCard}
                      onClose={closeAllPopups}
                      isImagePopupOpen={isImagePopupOpen}
                  />
                  <EditProfilePopup isButtonBlocked={isButtonBlocked}
                                    onUpdateUser={handleUpdateUser}
                                    isOpen={isEditProfilePopupOpen}
                                    handleClose={closeAllPopups}
                  />
                  <EditAvatarPopup isButtonBlocked={isButtonBlocked}
                                   onUpdateAvatar={handleUpdateAvatar}
                                   isOpen={isEditAvatarPopupOpen}
                                   handleClose={closeAllPopups}
                  />
                  <AddPlacePopup  isButtonBlocked={isButtonBlocked}
                                  onAddPlace={handleAddPlaceSubmit}
                                  isOpen={isAddPlacePopupOpen}
                                  handleClose={closeAllPopups}
                  />
                  <ConfirmDeleteCardPopup isButtonBlocked={isButtonBlocked}
                                          isOpen={isConfirmDeletePopupOpen}
                                          handleClose={closeAllPopups}
                                          handleDelete={handleCardDelete}
                  />
                  <InfoTooltip
                      isOpen={isInfoTooltipOpen}
                      handleClose={closeAllPopups}
                      isRegisterError={isRegisterError}
                  />
          </div>
      </CurrentUserContext.Provider>
  );
}