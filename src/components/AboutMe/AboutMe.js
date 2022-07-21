import SectionTitle from "../SectionTitle/SectionTitle";
import heroPhoto from  "../../images/1-126.jpg"
function AboutMe() {
    return (
        <section className="about-me">
            <SectionTitle title="Студент"/>
            <div className="about-me__info">
                <div className="about-me__info-text-content">
                    <h2 className="about-me__name">Алексей</h2>
                    <p className="about-me__title">Фронтенд-разработчик, 29 лет</p>
                    <p className="about-me__description">Я родился и живу в Иваново, закончил факультет электроэнергетики ИГЭУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, хожу в тренажерный зал. Недавно начал кодить. С 2013 года работал в компании «ОАО РЖД». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и приступил к поиску постоянной работы в IT.</p>
                    <ul className="about-me__social-networks">
                        <li ><a className="about-me__social-networks-link" href="https://vk.com/id18328535"
                                target='_blank' rel="noreferrer">Вконтакте</a></li>
                        <li><a className="about-me__social-networks-link" href="https://github.com/AxlLove"
                               target='_blank' rel="noreferrer">Github</a></li>
                    </ul>
                </div>
                <img src={heroPhoto} alt="heroImage" className="about-me__photo"/>
            </div>
        </section>
    );
}

export default AboutMe;