import {PopupWithForm} from "./PopupWithForm";
import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useForm} from "../hooks/useForm";

export function EditProfilePopup({isOpen, handleClose, onUpdateUser, isButtonBlocked}) {
    const user = useContext(CurrentUserContext)
    // const [ name, setName ] = useState('');
    // const [ description , setDescription ] = useState('');

    const {values, handleChange, setValues} = useForm({});

    React.useEffect(() => {
        if(user) {
        const { name: userName, about } = user;
            setValues({submitPopupName: userName, submitPopupJob: about, ...values, });
        }
    }, [user, isOpen])

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
        name: values.submitPopupName, about: values.submitPopupJob
        })
    }

   return(
           <PopupWithForm isButtonBlocked={isButtonBlocked} onSubmit={handleSubmit} title={'Редактировать профиль'} name={'info'} isOpen={isOpen} handleClose={handleClose}>
               <label className="popup__label">
                   <input
                       value={values.submitPopupName || ''}
                       onChange={handleChange}
                       className="popup__input popup__input_type_name"
                       name="submitPopupName"
                       placeholder="Имя"
                       type="text" required
                       minLength="2"
                       maxLength="40"
                       id="input-profile-name"/>
                   <span className="popup__input-error input-profile-name-error"></span>
               </label>
               <label className="popup__label">
                   <input
                       value={values.submitPopupJob || ''}
                       onChange={handleChange}
                       className="popup__input popup__input_type_job"
                       name="submitPopupJob"
                       placeholder="Занятие"
                       type="text" required
                       minLength="2"
                       maxLength="200"
                       id="input-profile-description"/>
                   <span className="popup__input-error input-profile-description-error"></span>
               </label>
           </PopupWithForm>
   )

}