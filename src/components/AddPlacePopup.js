import {PopupWithForm} from "./PopupWithForm";
import React from "react";
import {useForm} from "../hooks/useForm";

export function AddPlacePopup({ isOpen, onAddPlace, handleClose, isButtonBlocked}) {

    const {values, handleChange, setValues} = useForm({});

    React.useEffect(() => {
        setValues({submitCardName: '', submitCardLink: ''});
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace(
            values.submitCardName,
            values.submitCardLink
        );
    }

    return (
        <PopupWithForm title={'Новое место'} name={'card'} isOpen={isOpen} onSubmit={handleSubmit} handleClose={handleClose} isButtonBlocked={isButtonBlocked}>
            <label className="popup__label">
                <input
                    value={values.submitCardName || ''}
                    onChange={handleChange}
                    className="popup__input popup__input_mesto popup__input_mesto_name"
                    name="submitCardName"
                    placeholder="Название"
                    type="text" required
                    minLength="2"
                    maxLength="30"
                    id="input-mesto-name"/>
                <span className="popup__input-error input-mesto-name-error"></span>
            </label>
            <label className="popup__label">
                <input
                    value={values.submitCardLink || ''}
                    onChange={handleChange}
                    className="popup__input popup__input_mesto popup__input_mesto_link"
                    name="submitCardLink"
                    placeholder="Ссылка на картинку"
                    type="url" required
                    id="input-mesto-link"/>
                <span className="popup__input-error input-mesto-link-error"></span>
            </label>
        </PopupWithForm>
    )
}