import React from "react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

import SearchBar from './search-bar'
import WikiList from '@cpt/wiki-list/'

import { requestSearch } from './actions'


class Search extends React.Component {
    render() {
        const { history, results,
            requestSearch, } = this.props
        return (
            <main className='search'>
                <SearchBar onCloseClick={
                    () => history.goBack()
                } onInput={_.debounce(requestSearch, 300)} />
                <WikiList items={results} />
            </main>
        )
    }
}

function mapState(state) {
    return {
        results: state.search.results,

    }
}

function mapDispatch(dispatch) {
    return {
        requestSearch: (keyword) => { dispatch(requestSearch(keyword)) },

    }
}

export default withRouter(connect(mapState, mapDispatch)(Search))