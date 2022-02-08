function Profile(props) {
    return (
        <section className="profile">
            <h1 className='profile__title'>Привет, {props.name}!</h1>
            <form className='profile__form'>
                <div className='profile__form-item'>
                    <label className='profile__label'>Имя</label>
                    <input className='profile__input' type='text'></input>
                </div>
                <div className='profile__form-item'>
                    <label className='profile__label'>E-mail</label>
                    <input className='profile__input' type='email'></input>
                </div>
                <div className='profile__buttons'>
                <button type="button" className='profile__btn'>Редактировать</button>
                {/* <button type="submit" className='profile__btn'>Сохранить</button> */}
                <button type="button" className='profile__btn profile__exit-btn'>Выйти из аккаунта</button>
                </div>
                
            </form>
        </section>
    )
}
export default Profile;