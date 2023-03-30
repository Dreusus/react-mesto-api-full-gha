import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useContext } from 'react';

function Main(props) {
  const currentUser = useContext(CurrentUserContext)
  return (
    <main className="content">
      <section className="profile">
        <div className="avatar">
          <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}>
            <img src={currentUser.avatar}
              alt={currentUser.name}
              className="profile__avatar" />
          </button>
        </div>

        <div className="profile__info">
          <div className="profile__column-up">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {
          props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))
        }
      </section>
    </main>
  )
}

export default Main;

