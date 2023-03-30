import PopupWithForm from "./PopupWithForm"
import { useRef } from "react"

function EditAvatarPopup(props) {
  const userAvatarRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar({
      avatar: userAvatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input type="url"
        id="popup-avatar"
        name="popup-avatar"
        placeholder="Ссылка на картинку"
        required
        className="popup__text"
        ref={userAvatarRef}
      />
      <span className="popup__error popup-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup

