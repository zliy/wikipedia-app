import React from 'react'
import { connect } from 'react-redux'

import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'
import WikiListItem from '@cpt/wiki-list-item'

import WikiList from '@cpt/wiki-list/'


let scroll = 0

class Saved extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.props.fetchSummary()
    }
    componentDidMount() {
        window.scroll(0, scroll)
    }

    componentWillUnmount() {
        console.log('saved: componentWillUnmount')
        scroll = window.scrollY
    }

    render() {
        console.log('saved rendered')
        const { items } = this.props
        return (
            < main >
            <TopNavBar
                // iconLeft={TopNavBar.i.back}
                leftContent={'Clear'}
                iconRight={TopNavBar.i.search}
                // eslint-disable-next-line
                onTitleClick={() => location.reload()}
                onLeftClick={console.log.bind(null, 'Left clicked')}
            >Saved</TopNavBar>
            <WikiList items={items}></WikiList>
            <BottomNavBar></BottomNavBar>
            </main >
        )
    }
}

function fetchSummary(items) {
    return function (dispatch) {
        console.log('fetchSummary dispatch')
        return Promise.all(items.map(
            (title) => fetch(`https://zh.wikipedia.org/api/rest_v1/page/summary/${title}`).then((resp) => resp.json()))
        )
            .then(jsons => {
                return dispatch({ type: 'FETCH_SUMMARY', payload: jsons })

            })
    }
}

function mapState(state) {
    return {
        items: state.savedItems,
    }
}
function mapDispatch(dispatch) {
    return {
        fetchSummary: () => dispatch(fetchSummary(window.fakeSaved))
    }
}


export default connect(mapState, mapDispatch)(Saved)