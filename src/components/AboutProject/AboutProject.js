function AboutProject() {
    return(
        <div className="about-project">
            <div className="about-project__stages">
                <h2 className="about-project__titles about-project__stages-title">Дипломный проект включал 5 этапов</h2>
                <p className="about-project__subtitles about-project__stages-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="about-project__time">
            <h2 className="about-project__titles about-project__time-title">На выполнение диплома ушло 5 недель</h2>
            <p className="about-project__subtitles about-project__time-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="about-project__timesheet">
                <div className="about-project__timesheet-parts">
                    <div className="about-project__line about-project__line_green">1 неделя</div>
                    <p className="about-project__timesheet-sign">Back-end</p>
                </div>
                <div className="about-project__timesheet-parts">
                    <div className="about-project__line about-project__line_grey">4 недели</div>
                    <p className="about-project__timesheet-sign">Front-end</p>
                </div>
            </div>
        </div>
    )
}
export default AboutProject;