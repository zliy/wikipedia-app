import React from "react"
import { connect } from "react-redux"

import TopNavBar from "@cpt/top-navbar/index.js"
import BottomNavBar from '@cpt/bottom-navbar/'
import WikiList from '@cpt/wiki-list/'

import mapTime from '@/js/mapTime'

let scroll = 0

class History extends React.Component {
    
    componentWillUnmount() {
        scroll = window.scrollY
    }
    componentDidMount() {
        window.scroll(0, scroll)
    }

    render() {
        const { historyGroups } = this.props
        console.log('mapped historyGroups: ', historyGroups)
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
                {historyGroups.map(group => {
                    return <WikiList items={group.data}>{group.readableTime}</WikiList>
                })}
                <BottomNavBar></BottomNavBar>
            </main>
        )
    }
}

function mapState(state) {
    function splitHistory(items) {
        return items.reduceRight((mapedState, item) => {
            let { readableTime, index } = mapTime(item.time)
            mapedState[index] = mapedState[index] || { readableTime, data: [] }
            mapedState[index].data.push(item.summary)
            return mapedState
        }, [])
    }
    console.log(state.historyItems)
    return {
        historyGroups: splitHistory(state.historyItems),
    }
}


export default connect(mapState)(History)

