import React from 'react'
import classNames from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {
    Link,
} from 'react-router-dom'

export default function (props) {
    const { title, displayTitle, description, extract, thumbnail,
        noborder, liID } = props
    const thumbSrc = thumbnail && thumbnail.source
    const classSet = classNames({
        border: !noborder,
        'wiki-list-item': true,
    })

    return (
        <li className={classSet} data-liid={liID}>
            <Link to={'/wiki/' + title}>
                <section>
                    <h4>{title}</h4>
                    <p>{description || extract}</p>
                </section>
                {thumbSrc ? <div style={{ "backgroundImage": `url('${thumbSrc}')` }} /> : ''}
            </Link>
        </li>
    )
}


export function Collapse({ children, ...props }) {
    return (
        <CSSTransition timeout={300} {...props}  classNames="collapse">
            {children}
        </CSSTransition>
    )
}

