import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import {useFormWithValidation} from '../Validation/Validation'
import ErrorPopup from "../ErrorPopup/ErrorPopup";

function Profile(props) {
    const [isEdit, setIsEdit] = React.useState(false)
    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleChange, resetForm, errors, isValid, setValues } = useFormWithValidation();
    const isDisabled = !isValid

    function handleSubmit(e) {
        e.preventDefault();
        props.onProfile({name: values.name, email: values.email });
        setIsEdit(false)
    }
    function handleEdit() {
        setIsEdit(true)
    }
    React.useEffect(() => {
        setValues(currentUser)
      }, [resetForm, currentUser, setValues]);

    return (
        <section className="profile">
            <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
            <form className='profile__form' onSubmit={handleSubmit}>
                <div className='profile__form-item'>
                    <label className='profile__label'>Имя</label>
                    <input 
                        className={`${!isEdit ? "profile__input profile__input_disabled" : "profile__input"}`}
                        type='text' 
                        name="name" 
                        value={values.name || ''}  
                        onChange={handleChange}
                        minLength="2"
                        maxLength="30"
                        pattern="^[A-Za-zА-Яа-яЁё\s]+$"
                        required
                        disabled={!isEdit}
                        />
                </div>
                <span className="form__error">{errors.name}</span>
                <div className='profile__form-item'>
                    <label className='profile__label'>E-mail</label>
                    <input 
                        className={`${!isEdit ? "profile__input profile__input_disabled" : "profile__input"}`}
                        type='email' 
                        name="email" 
                        value={values.email || ''}  
                        onChange={handleChange}
                        required
                        disabled={!isEdit}
                        />
                </div>
                <span className="form__error">{errors.email}</span>
                <div className='profile__buttons'>
                <ErrorPopup isError={props.isError} title={props.title}/>
                {isEdit ? 
                (<button type="submit" className='profile__btn' disabled={isDisabled}>Сохранить</button>) : 
                (<>
                    <button type="button" className='profile__btn' onClick={handleEdit}>Редактировать</button>
                    <button type="button" className='profile__btn profile__exit-btn' onClick={props.onSignOut}>Выйти из аккаунта</button>
                </>)}
                
                </div>
                
            </form>
        </section>
    )
}
export default Profile;