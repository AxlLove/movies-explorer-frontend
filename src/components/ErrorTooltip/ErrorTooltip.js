function ErrorTooltip({errorTooltip}) {

    return (
            <div className={`info-tooltip ${errorTooltip.open? 'info-tooltip_visible': ''}`}>
                <p className="info-tooltip__message">{errorTooltip.message}</p>
            </div>
    );
}

export default ErrorTooltip;