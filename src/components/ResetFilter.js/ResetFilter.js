function ResetFilter({loadSavedCards}) {
    return (
        <label className="reset-filter">
            <button type="button" onClick={loadSavedCards} className="reset-filter__button"></button>
            <span className="reset-filter__button-name">Очистить фильтр</span>
        </label>
    
    )
}
export default ResetFilter;