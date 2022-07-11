import './Promo.css';

function Promo() {
    return (
        <section className="promo">
            <div className="promo__content">
                <div className="promo__text-container">
                    <h1 className="promo__title">Учебный проект студента <br/> факультета <br/> Веб-разработки.</h1>
                    <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                </div>
                <div className="promo__image"/>
            </div>

            <button className="promo__button">Узнать больше</button>

        </section>
    );
}

export default Promo;
//TODO @media </br display-none https://translated.turbopages.org/proxy_u/en-ru.ru.82ca8cd0-62cc3984-916c4470-74722d776562/https/stackoverflow.com/questions/2703601/how-to-line-break-from-css-without-using-br