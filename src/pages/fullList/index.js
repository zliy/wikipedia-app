import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'
import WikiList from '@cpt/wiki-list/'
import WikiListItem from '@cpt/wiki-list-item'


class FullList extends React.Component {
    render() {
        const { history, match, TopTitle, items, } = this.props
        return (
            <main className="fulllist">
                <TopNavBar
                    iconLeft={TopNavBar.i.back}
                    leftContent="Back"
                    onLeftClick={() => history.goBack()}
                >TopTitle</TopNavBar>
                <WikiList items={items} noborder />
            </main>
        )
    }
}

function mapState(state, ownProps) {
    const { type, list } = ownProps.match.params
    const { explored } = state.explore
    let items
    switch (type) {
        case 'topRead':
            items = explored.filter(card => card.type === "topRead" && card.date === list)[0].items
            break
        case 'moreLike':
            items = explored.filter(card => card.type === "moreLike" && card.summary.title === list)[0].items
            break
        default:
            throw new Error('fullList: unknown List Type')
    }
    return {
        items: items
    }
}

export default withRouter(connect(mapState, )(FullList))