import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="section-title">О проекте</h2>
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
        </section>
    );
}

export default AboutProject;