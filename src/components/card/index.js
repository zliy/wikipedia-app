import React from 'react'

export const SaveForLater = ({ saved, ...restProps }) => {
    return (
        <div style={{ color: "blue", }} {...restProps} >
            {saved ? <i className="fa fa-bookmark" aria-hidden="true"></i>
                : <i className="fa fa-bookmark-o" aria-hidden="true"></i>}
            {saved ? "已收藏此条目" : "收藏此条目"}
        </div>

    )
}


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
    const { imgSrc, title, description, children, } = props
    return (
        <div className="card-body">
            {imgSrc ?
                <div className="imgCover"><img src={imgSrc} alt="" /></div>
                : ''}
            {title || description ?
                <div className="card-body-content">
                    {title && <h2>{title}</h2>}
                    {description && <p>{description}</p>}
                    {children}
                </div> : ''}
        </div>
    )
}

Card.footer = function (props) {
    let { } = props
    return (
        <footer>
            Another footer todo
        </footer>
    )
}

export default Card
