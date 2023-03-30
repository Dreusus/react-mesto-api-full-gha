import React from "react";

function InfoTooltip(props) {

  return (
    <div className={props.isOpen ? 'popup popup_opened' : 'popup'}>
      <div className="popup__container">
        <img className="popup__image" src={props.statusImage} alt={`${props.title}`} />
        <h2 className="popup__title ">{props.title}</h2>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;

