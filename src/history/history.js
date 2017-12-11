import React from "react"
import { connect } from "react-redux"

import TopNavBar from "@cpt/top-navbar/index.js"
import BottomNavBar from '@cpt/bottom-navbar/'
import WikiList from '@cpt/wiki-list/'

import mapTime from '@/js/mapTime'

class History extends React.Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {

        // this.props.fetchSummary(this.props.historyGroups)
    }

    render() {
        const { historyGroups } = this.props
        console.log(historyGroups)
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
                {historyGroups.map(item => {
                    return <WikiList items={item.data}>{item.readableTime}</WikiList>
                })}
                <BottomNavBar></BottomNavBar>
            </main>
        )
    }
}

function mapState(state) {
    function splitHistory(items) {
        return items.reduceRight((ary, item) => {
            let timeindex = mapTime(item.time)
            ary[timeindex.index] = ary[timeindex.index]
                || { readableTime: timeindex.readableTime, data: [] }
            ary[timeindex.index].data.push(item)
            return ary
        }, [])
    }
    return {
        historyGroups: splitHistory(state.historyItems),
    }
}

function fetchSummary(groups) {
    return function (dispatch) {
        console.log('fetchSummary dispatch')
        return Promise.all(groups.reduce(
            (allPoms, oneday) =>
                allPoms.concat(oneday.data.reduce((memo, { title }) =>
                    memo.concat(fetch(`https://zh.wikipedia.org/api/rest_v1/page/summary/${title}`).then((resp) => resp.json()))
                    , []))
            , [])
        )
            .then(jsons => {
                return dispatch({ type: 'HISTORY/FETCH_SUMMARY', payload: jsons })

            })
    }
}

export default connect(mapState, function (dispatch) {
    return {
        fetchSummary: (items) => dispatch(fetchSummary(items))
    }

})(History)

