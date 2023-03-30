import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description
    })

  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        value={name}
        onChange={handleChangeName}
        type="text"
        id="profile-name"
        className="popup__text"
        name="profile-name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
      />

      <span className="popup__error profile-name-error"></span>
      <input
        value={description}
        onChange={handleChangeDescription}
        type="text"
        id="profile-about"
        className="popup__text"
        name="profile-about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__error profile-about-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;


