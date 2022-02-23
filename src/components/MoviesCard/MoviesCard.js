import React from 'react';
import MoviePic from '../../images/movie-pic.png'
function MoviesCard() {
    const [isSaved, setIsSaved] = React.useState(true)
    const [color, setColor] = React.useState('')
    function doSaved() {
        setIsSaved(!isSaved)
        if(isSaved === true) {
            setColor('#2BE080')
        }
        else {
            setColor('#F9F9F9')
        }
    }
    return(
        <div className="movies-card">
            <img className="movies-card__img" alt="moviePicture" src={MoviePic}/>
            <div className='movies-card__box'>
                <h2 className='movies-card__title'>33 слова о дизайне</h2>
                {window.location.pathname === '/saved-movies' ? (<button type='button' className='movies-card__btn movies-card__cross'/>) : ( <button type='button' className='movies-card__btn movies-card__circle' onClick={doSaved} style={{background:color}}/>)}
            </div>
            <p className='movies-card__sign'>1ч42м</p>
        </div>
    )
}
export default MoviesCard;