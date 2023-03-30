function PopupWithForm(props) {

  return (
    <section className={`popup popup-${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close"
        />
        <form
          onSubmit={props.onSubmit}
          name={`${props.name}`}
          className="popup__form"
        >
          <h2 className="popup__title ">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className="popup__accept">
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>

  )
}

export default PopupWithForm;

