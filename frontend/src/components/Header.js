import { Link, Routes, Route } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
          <div className="header__logo"></div>
          <div className='header__menu'>
            {props.loggedIn
              ? <>
                  <p className='header__email'>{props.userEmail}</p>
                  <button type="button" className='header__link' onClick={props.onLogout}>Выйти</button>
                </>
              : <Routes>
                  <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
                  <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
                </Routes>
            }
          </div>
        </header>
    )
}
export default Header;