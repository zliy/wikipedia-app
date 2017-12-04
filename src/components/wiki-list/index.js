import React from 'react'
import WikiListItem from '../wiki-list-item'


export default class extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { items, children } = this.props

        return (
            <div className="wiki-list">
                {children ? <div className="listtitle">{children}</div> : ''}
                <ul>
                    {
                        items.map((item) => {
                            return <WikiListItem {...{ ...item }}></WikiListItem>
                        })
                    }
                </ul>
            </div>
        )
    }
}
