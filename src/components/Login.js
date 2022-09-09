import {Auth} from "./Auth";

export function Login({onSubmit}) {

    return (
        <Auth onSubmit={onSubmit} title={'Вход'} button={'Войти'}></Auth>
        )
}