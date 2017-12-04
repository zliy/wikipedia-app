import React from "react"
import { connect } from "react-redux"

import TopNavBar from "@cpt/top-navbar/index.js"
import BottomNavBar from '@cpt/bottom-navbar/'

class History extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <main>
                <TopNavBar on
                    // iconLeft={TopNavBar.i.back}
                    leftContent={'Clear'}
                    iconRight={TopNavBar.i.search}
                    // eslint-disable-next-line
                    onTitleClick={() => location.reload()}
                    onLeftClick={console.log.bind(null, 'Left clicked')}
                >History</TopNavBar>

                <BottomNavBar></BottomNavBar>
            </main>
        )
    }
}


export default connect()(History)

