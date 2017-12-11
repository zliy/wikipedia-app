import React from 'react'
import { connect } from 'react-redux'

import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'
import WikiListItem from '@cpt/wiki-list-item'

import WikiList from '@cpt/wiki-list/'

import get from '@/js/fetch'

let scroll = 0

class Saved extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
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
        return 
    }
} 


function mapState(state) {
    return {
        items: state.savedItems,
    }
}
function mapDispatch(dispatch) {
    return {
        getSummary: () => dispatch(),
    }
}


export default connect(mapState, mapDispatch)(Saved)