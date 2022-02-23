import Arrow from '../../images/arrow.svg'
function PortfolioLink(props) {
return(
    <div className="portfolio-link">
        <div className="portfolio-link__box">
            <a className="portfolio-link__link" href={props.src} target="_blank" rel="noreferrer">
                <h2 className="portfolio-link__title">{props.title}</h2>
                <img className="portfolio-link__icon" alt="arrow" src={Arrow}></img>
            </a>
        </div>
        <hr/>
    </div>
)
}
export default PortfolioLink;