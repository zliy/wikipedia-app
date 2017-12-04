import React from 'react'

import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'

export default class extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <main className="wiki">
                <TopNavBar fixed
                    iconLeft={TopNavBar.i.back}
                    leftContent="Back"
                    iconRight={TopNavBar.i.search}
                    // eslint-disable-next-line
                    onLeftClick={()=>history.back()}
                >W</TopNavBar>
                这是一篇wiki文章
            <br />
                path: {this.props.match.url}


            </main>
        )
    }
}
