import success from '../images/success.png'
import fail from '../images/fail.png'

export function InfoTooltip({ isOpen, isRegisterError, handleClose }) {



       return (
       <div className={`popup popup_type_info ${isOpen && "popup_open"}`}>
            <div className="popup__container popup__container_tooltip">
                <button
                    onClick={handleClose}
                    className="popup__close-button popup__close-button_figure"
                    type="button"
                    aria-label="close popup">
                </button>
                <img src={ isRegisterError ? fail : success} className="popup__img-tooltip" alt="Картинка"/>
                <p className="popup__text popup__text_tooltip">{isRegisterError ? 'Что-то пошло не так!' +
                    'Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}</p>
            </div>

        </div>
    )
}