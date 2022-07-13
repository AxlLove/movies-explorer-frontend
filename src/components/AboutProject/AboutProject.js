import SectionTitle from "../SectionTitle/SectionTitle";

function AboutProject() {
    return (
        <section className="about-project">
            <SectionTitle title="О проекте"/>
            <div className="about-project__two-column">
                <div className="about-project__text-content">
                    <h3 className="about-project__quote">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__text-content">
                    <h3 className="about-project__quote">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__time-line">
                <div className="about-project__first-week">
                    <p className="about-project__time-line-text">1 неделя</p>
                </div>
                <div className="about-project__four-weeks">
                    <p className="about-project__time-line-text">4 недели</p>
                </div>
                <p className="about-project__time-line-text about-project__time-line-text_color_gray">Back-end</p>
                <p className="about-project__time-line-text about-project__time-line-text_color_gray">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;