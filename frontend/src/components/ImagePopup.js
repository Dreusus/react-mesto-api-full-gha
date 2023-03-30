function ImagePopup(props) {

  return (
    <section className={`popup popup_photo ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_photo">
        <button className="popup__close"
          type="button"
          id="closePhoto"
          onClick={props.onClose}></button>
        <img src={props.card.link} alt={props.card.name} className="popup__image" />
        <h2 className="popup__subscription-photo">{props.card.name}</h2>
      </div>
    </section>
  )

}

export default ImagePopup;