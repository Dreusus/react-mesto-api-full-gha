import logo from '../images/header__logo.svg';
import { Link, useLocation } from 'react-router-dom'
function Header({ email, loggedIn, handleLogout }) {

  const location = useLocation()

  function getButtonValue() {
    switch (location.pathname) {
      case '/signin':
        return 'Регистрация';
      case '/signup':
        return 'Войти';
      default:
        return 'Выйти';
    }
  }

  function getButtonRoute() {
    switch (location.pathname) {
      case '/signin':
        return '/signup';
      case '/signup':
        return '/signin';
      default:
        return '/signin';
    }
  }

  function handleClick() {
    if (getButtonValue() === 'Выйти') {
      handleLogout();
    }
  }

  return (
    <header className="header">
      <img src={logo}
        alt="Логотип Место"
        className="header__logo" />
      <div className="header__container">
        {loggedIn && <p className="header__email">{email}</p>}
        <Link className="header__link" to={getButtonRoute()}>
          <button className="header__button" onClick={handleClick}>{getButtonValue()}</button>
        </Link>
      </div>
    </header>
  )
}

export default Header

