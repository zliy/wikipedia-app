import React from "react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

import SearchBar from './search-bar'
import WikiList from '@cpt/wiki-list/'

import * as actions from './actions'


class Search extends React.Component {


    debouncedRequest = _.debounce(this.props.requestSearch, 300)

    handleInput = (e) => {
        this.props.changeInput(e.target.value)
        this.debouncedRequest(e.target.value)
    }

    render() {
        const { history, results, inputtingText,
            clearInput } = this.props
        return (
            <main className='search'>
                <SearchBar inputtingText={inputtingText}
                    onCloseClick={() => { history.goBack() }}
                    clearInput={clearInput}
                    onInput={this.handleInput}
                />
                <WikiList items={results} />
            </main>
        )
    }
}

function mapState(state) {
    return {
        results: state.search.results,
        inputtingText: state.search.inputtingText
    }
}

function mapDispatch(dispatch) {
    return {
        requestSearch: (keyword) => { dispatch(actions.requestSearch(keyword)) },
        changeInput: (inputVal) => { dispatch(actions.changeInput(inputVal)) },
        clearInput: () => { dispatch(actions.changeInput('')) }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Search))