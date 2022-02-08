import PortfolioLink from "../PortfolioLink/PortfolioLink";
function Portfolio() {
    return(
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <PortfolioLink title={"Статичный сайт"} src={'https://oleestral.github.io/how-to-learn/index.html'}/>
            <PortfolioLink title={"Адаптивный сайт"} src={'https://oleestral.github.io/russian-travel/index.html'}/>
            <PortfolioLink title={"Одностраничное приложение"} src={'https://oleestral.nomoredomains.work/'}/>
        </section>
    )
}
export default Portfolio;