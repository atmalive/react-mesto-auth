import React from 'react'
import {Link} from "react-router-dom";
import {useForm} from "../hooks/useForm";

export function Auth({ title, button, isBottomTextShown, onSubmit }) {


    const {values, handleChange} = useForm({});

    const submitData = (e) => {
        e.preventDefault()
        onSubmit(values.email, values.password)
    }

    return (
        <div className="auth">
            <h1 className="auth__title">{title}</h1>

            <form onSubmit={submitData} action="" className="auth__form">
                <input
                    value={values.email || ''}
                    onChange={handleChange}
                    placeholder={'E-mail'}
                    name={'email'}
                    type="text"
                    className="auth__input"/>
                <input
                    value={values.password || ''}
                    onChange={handleChange}
                    placeholder={'Password'}
                    name={'password'}
                    type="password"
                    className="auth__input"/>
                <button className="auth__button">{button}</button>
            </form>
            {isBottomTextShown && <p className="auth__text">Уже зарегистрированы? <Link className='auth__text auth__text_link'
                                                                   to={"/sign-in"}>Войти</Link></p>}
        </div>
    )
}