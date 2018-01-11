import React from 'react'
import WikiListItem, { Collapse } from '../wiki-list-item'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


export default class extends React.Component {

    render() {
        const { items, children, noborder, ...restProps } = this.props
        return (
            <div className="wiki-list" {...restProps}>
                {children ? <div className="listtitle">{children}</div> : ''}
                    <TransitionGroup component='ul'>
                        {
                            items.map((item) => {
                                return (
                                    <Collapse key={item.title} timeout={3000}>
                                        <WikiListItem noborder={noborder} liID={item.title} {...item }></WikiListItem>
                                    </Collapse>
                                )
                            })
                        }
                    </TransitionGroup>
            </div>
        )
    }
}

