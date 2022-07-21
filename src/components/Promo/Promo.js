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
<a  href='https://github.com/AxlLove/movies-explorer-frontend' target='_blank' rel="noreferrer"><button className="promo__button">Узнать больше</button></a>
            

        </section>
    );
}

export default Promo;
