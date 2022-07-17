function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__container">
                    <a href="https://github.com/AxlLove/how-to-learn" target='_blank' rel="noreferrer" className="portfolio__link">
                        <p className="portfolio__link-text">Статичный сайт</p>
                        <div className="portfolio__link-icon"/>
                    </a>
                </li>
                <li className="portfolio__container">
                    <a href="https://github.com/AxlLove/russian-travel" target='_blank' rel="noreferrer" className="portfolio__link">
                        <p className="portfolio__link-text">Адаптивный сайт</p>
                        <div className="portfolio__link-icon"/>
                    </a>
                </li>
                <li className="portfolio__container">
                    <a href="https://github.com/AxlLove/react-mesto-api-full" target='_blank' rel="noreferrer" className="portfolio__link">
                        <p className="portfolio__link-text">Одностраничное приложение</p>
                        <div className="portfolio__link-icon"/>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;