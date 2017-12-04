import React from 'react'

class Card extends React.Component {
    render() {
        const { children } = this.props
        return (
            <section className="card">
                {children}
            </section >
        )
    }
}
Card.header = function (props) {
    const { title, subtitle, thumb } = props
    return (
        <header className="card-header">
            <img src={thumb} alt="" />
            <div className="card-titles">
                <p>{subtitle}</p>
                <h4>{title}</h4>
            </div>
        </header>
    )
}
Card.body = function (props) {
    const { imgSrc, title, description, save } = props
    return (
        <div className="card-body">
            {imgSrc ?
                <div className="imgCover"><img src={imgSrc} alt="" /></div>
                : ''}
            {title || description ?
                <div className="card-body-content">
                    {title && <h2>{title}</h2>}
                    {description && <p>{description}</p>}
                </div> : ''}
        </div>
    )
}
Card.footer = function (props) {
    return (
        <footer>
            Another footer todo
        </footer>
    )
}
export default Card