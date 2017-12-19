import React from 'react'
import WikiListItem from '../wiki-list-item'


export default class extends React.Component {

    render() {
        const { items, children, onTouchStart, onTouchEnd ,onTouchMove} = this.props

        return (
            <div className="wiki-list" {...{ onTouchStart, onTouchEnd,onTouchMove }}>
                {children ? <div className="listtitle">{children}</div> : ''}
                <ul>
                    {
                        items.map((item) => {
                            return <WikiListItem liID={item.title} key={item.title} {...item }></WikiListItem>
                        })
                    }
                </ul>
            </div>
        )
    }
}
