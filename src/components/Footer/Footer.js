import { Route } from 'react-router-dom';
function Footer() {
return(
    <Route path="/(|movies|saved-movies)">
        <footer className="footer">
        <p className="footer__sign">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <hr className="footer__line"/>
        <div className="footer__box">
            <p className="footer__year">&copy;2022</p>
            <div className="footer__navigation">
                <a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                <a href="https://github.com/oleestral" className="footer__link" target="_blank" rel="noreferrer">Github</a>
                <a href="https://vk.com/oleestra" className="footer__link" target="_blank" rel="noreferrer">VK</a>
            </div>
        </div>
    </footer>
    </Route>
    
)
}
export default Footer;