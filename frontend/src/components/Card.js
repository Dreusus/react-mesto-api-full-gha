import { useContext } from 'react'
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card(props) {
  const currentUser = useContext(CurrentUserContext)

  const isOwn = props.card.owner === currentUser._id;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);
 
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  )

  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="element">
      <img
        onClick={handleClick}
        alt={props.card.name}
        src={props.card.link}
        className="element__image"
      />
      {isOwn && <button className='element__delete' onClick={handleDeleteClick} />}
      <div className="element__subscription">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__group-like">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
          />
          <span className="element__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </div>

  )
}

export default Card;