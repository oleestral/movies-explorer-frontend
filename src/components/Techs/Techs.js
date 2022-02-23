import TechUnit from "../TechUnit/TechUnit";

function Techs() {
return (
    <section className="techs">
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__box">
            <TechUnit text={"HTML"}/>
            <TechUnit text={"CSS"}/>
            <TechUnit text={"JS"}/>
            <TechUnit text={"React"}/>
            <TechUnit text={"Git"}/>
            <TechUnit text={"Express.js"}/>
            <TechUnit text={"mongoDB"}/>
        </div>
    </section>
)
}
export default Techs;