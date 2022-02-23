import AboutHeaders from "../AboutHeaders/AboutHeaders";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Promo from '../Promo/Promo'
function Main() {
    return(
        <section className="main">
            <Promo/>
            <AboutHeaders title={"О проекте"}/>
            <AboutProject/>
            <AboutHeaders title={"Технологии"} color={'#F5F5F5'}/>
            <Techs/>
            <AboutHeaders title={"Студент"}/>
            <AboutMe/>
            <Portfolio/>
        </section>
        
    )
}
export default Main;