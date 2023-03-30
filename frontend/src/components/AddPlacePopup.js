import PopupWithForm from './PopupWithForm'
import { useEffect, useState } from 'react'

function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name: name,
      link: link
    })
  }

  useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="add"
      title="Новое место"
      buttonText={props.isLoading ? 'Создание...' : 'Создать'}
    >
      <input
        value={name}
        onChange={handleChangeName}
        type="text"
        id="popup-mesto"
        className="popup__text"
        name="profile-mesto"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error popup-mesto-error"></span>
      <input
        value={link}
        onChange={handleChangeLink}
        type="url"
        id="popup-img"
        className="popup__text"
        name="profile-img"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup-img-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;



