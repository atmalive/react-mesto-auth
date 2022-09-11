import {PopupWithForm} from "./PopupWithForm";
import React from 'react'
import {useForm} from "../hooks/useForm";

export function EditAvatarPopup({ isButtonBlocked, isOpen, handleClose, onUpdateAvatar}) {

    const {values, handleChange, setValues} = useForm({});

    React.useEffect(() => {
        setValues({submitAvatarLink: ''});
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: values.submitAvatarLink,
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isButtonBlocked={isButtonBlocked}
            title={'Обновить аватар'}
            name={'avatar'}
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <label className="popup__label">
                <input
                    value={values.submitAvatarLink || ''}
                    onChange={handleChange}
                    className="popup__input popup__input_avatar popup__input_avatar_link"
                    name="submitAvatarLink"
                    placeholder="Ссылка на картинку"
                    type="url" required
                    id="input-avatar-link"/>
                <span className="popup__input-error input-avatar-link-error"></span>
            </label>
        </PopupWithForm>
    )
}