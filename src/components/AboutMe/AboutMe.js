function AboutMe() {
    return (
        <section className="about-me">
            <div className="about-me__box about-me__navigation">
                <a href="https://vk.com/oleestra" className="about-me__link" target="_blank" rel="noreferrer"><p className="about-me__link-text">VK</p></a>
                <a href="https://github.com/oleestral" className="about-me__link" target="_blank" rel="noreferrer"><p className="about-me__link-text">Github</p></a>
            </div>
            <div className="about-me__box about-me__info">
            <h2 className="about-me__title">Олеся</h2>
            <p  className="about-me__subtitle">Junior Frontend Developer, 23 года</p>
            <p className="about-me__paragraph">Я родилась и живу в Москве, закончила факультет бизнес-информатики НИТУ МИСиС. Люблю слушать музыку, увлекаюсь боксом и горными лыжами. С недавних пор начала увлекаться веб-разработкой и вот уже практически полгода работаю в роли младшего фрондент-разработчика :)</p>
            </div>
            <div className="about-me__box about-me__photo"></div>
            
        </section>
    )

}
export default AboutMe;