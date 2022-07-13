import SectionTitle from "../SectionTitle/SectionTitle";

function Techs() {
    return (
        <section className="techs">
            <SectionTitle title="Технологии"/>
            <h2 className="techs__title">7 технологий</h2>
            <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__list">
                <li className="techs__tech">
                    <p className="techs__tech-name">HTML</p>
                </li>
                <li className="techs__tech">
                    <p className="techs__tech-name">CSS</p>
                </li>
                <li className="techs__tech">
                    <p className="techs__tech-name">JS</p>
                </li>
                <li className="techs__tech">
                    <p className="techs__tech-name">React</p>
                </li>
                <li className="techs__tech">
                    <p className="techs__tech-name">Git</p>
                </li>
                <li className="techs__tech">
                    <p className="techs__tech-name">Express.js</p>
                </li>
                <li className="techs__tech">
                    <p className="techs__tech-name">mongoDB</p>
                </li>

            </ul>
        </section>
    );
}

export default Techs;