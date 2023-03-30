import { useState, useEffect } from 'react';
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import ImagePopup from '../components/ImagePopup';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register'
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/Api-auth';
import InfoTooltip from './InfoTooltip';
import GoodReq from '../images/GoodReq.svg';
import BadReq from '../images/BadReq.svg';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' })
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [cards, setCards] = useState([])

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState({ opened: false, success: false })


  const navigate = useNavigate()
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false)
    setInfoTooltipOpen({ opened: false, success: isInfoTooltipOpen.success })
  }

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })

    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    tokenCheck()
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      navigate("/")
      return
    }
  }, [loggedIn, navigate])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true)
    api.editUserInfo({ name, about })
      .then(({ name, about }) => {
        setCurrentUser({ ...currentUser, name, about })
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true)
    api.editUserAvatar({ avatar })
      .then(({ avatar }) => {
        setCurrentUser({ ...currentUser, avatar })
        closeAllPopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true)
    api.addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  function handleLogin({ password, email }) {
    return auth.login({ password, email })
      .then((res) => {
        localStorage.setItem('token', res.token)
        tokenCheck()
        setLoggedIn(true)
        navigate('/')
      })
      .catch(() => {
        setInfoTooltipOpen({ opened: true, success: false })
      })
  }

  function handleRegister({ password, email }) {
    return auth.register({ password, email })
      .then(() => {
        setInfoTooltipOpen({ opened: true, success: true })
        navigate('/signin')
      })
      .catch(() => {
        setInfoTooltipOpen({ opened: true, success: false })
      })
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      auth.checkToken(token).then((res) => {
        if (res) {
          setUserEmail(res.data.email)
          setLoggedIn(true)
        }
      })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header email={userEmail} loggedIn={loggedIn} handleLogout={handleLogout} />

          <Routes>
            <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
            <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
            <Route path="/" element={<ProtectedRoute
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              userInfo={currentUser}
              loggedIn={loggedIn}
            />} />
            <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
          </Routes>

          {loggedIn ? <Footer /> : null}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <PopupWithForm
            isOpen={isDeleteCardPopupOpen}
            title='Вы уверены?'
            name='delete'
            buttonText='Сохранить'
            onClose={closeAllPopups}
          />
          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen.opened}
            onClose={closeAllPopups}
            statusImage={isInfoTooltipOpen.success ? GoodReq : BadReq}
            title={isInfoTooltipOpen.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
