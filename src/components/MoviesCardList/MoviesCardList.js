import MoviesCard from '../MoviesCard/MoviesCard';
function MoviesCardList() {
return (
    <div className='movies-card-list'>
        <div className='movies-card-list__box'>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
    </div>
    <button type='button' className='movies-card-list__btn'>Ещё</button>
    </div>
)
}
export default MoviesCardList