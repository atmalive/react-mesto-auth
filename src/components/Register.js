import {Auth} from "./Auth";

export function Register({onSubmit}) {

    return (
        <Auth onSubmit={onSubmit} title={'Регистрация'} button={'Зарегистрироваться'} isBottomTextShown></Auth>
    )
}