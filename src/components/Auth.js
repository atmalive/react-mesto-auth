import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";

export function Auth({ title, button, isBottomTextShown, onSubmit }) {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitData = (e) => {
        e.preventDefault()
        onSubmit(email, password)
    }

    return (
        <div className="auth">
            <h1 className="auth__title">{title}</h1>

            <form action="" className="auth__form">
                <input value={email} onChange={(event) => {
                    setEmail(event.target.value)
                }} placeholder={'E-mail'} type="text" className="auth__input"/>
                <input value={password} onChange={(event) => {
                    setPassword(event.target.value)
                }} placeholder={'Password'} type="password" className="auth__input"/>
                <button onClick={submitData} className="auth__button">{button}</button>
            </form>
            {isBottomTextShown && <p className="auth__text">Уже зарегистрированы? <Link className='auth__text auth__text_link'
                                                                   to={"/sign-in"}>Войти</Link></p>}
        </div>
    )
}