import './Promo.css';

function Promo() {
    return (
        <section className="promo">
            <div className="promo__content">
                <div className="promo__text-container">
                    <h1 className="promo__title">Учебный проект студента  факультета Веб&#8209;разработки.</h1>
                    <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                </div>
                <div className="promo__image"/>
            </div>

            <button className="promo__button">Узнать больше</button>

        </section>
    );
}

export default Promo;
