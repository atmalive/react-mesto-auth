import logo from '../images/logo.svg';
import {Link, useLocation} from "react-router-dom";
const logoImg = logo;

export function Header({ isAuthtorized, email, signOut }) {
    const location = useLocation()
    const linkText = location.pathname === "/sign-in" ? "Зарегистрироваться" : "Войти";
    const linkUrl = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";

    return (
        <header className="header">
            <img src={logoImg} alt="Логотип Место" className="header__logo"/>
            <div className="header__auth">
                {isAuthtorized ? <>
                <p className="header__email">{email}</p>
                    <button onClick={signOut} className="header__enter">Выйти</button>
                </> : <Link to={linkUrl} className="header__enter">{linkText}</Link> }
            </div>
        </header>
    )
}