import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import { push } from "react-router-redux"
import { withRouter } from 'react-router-dom'
import TopNavBar from '@cpt/top-navbar/'
import BottomNavBar from '@cpt/bottom-navbar/'


class Wiki extends React.Component {
    componentWillMount() {
        this.props.loadContent(this.props.match.params.idName)
    }
    componentDidMount() {
        window.scroll(0, 0)
        console.log('--------wikiMount')
    }
    render() {
        console.log('--------wiki render')
        const { content } = this.props
        return (
            <main className="wiki">
                <TopNavBar fixed
                    iconLeft={TopNavBar.i.back}
                    leftContent="Back"
                    iconRight={TopNavBar.i.search}
                    // eslint-disable-next-line
                    onLeftClick={() => history.back()}
                >W</TopNavBar>
                <div id="wiki-style">
                    <div id="content">
                        <article className="content" dangerouslySetInnerHTML={{
                            __html: content.sections && content.sections.reduce((prev, curr) => {
                                let secHeader = (curr.line && curr.level) ? `<h${curr.level}>${curr.line}</h${curr.level}>` : ''
                                let section = secHeader + curr.text
                                return prev + section
                            }, `<h1>${content.displaytitle}</h1><p>${content.description}</p>`)
                        }}
                            onClick={(e) => {
                                if (e.target.nodeName == 'A' && e.target.getAttribute("href").startsWith('/wiki/')) {
                                    e.preventDefault()
                                }
                            }} />
                    </div>
                </div>


            </main>
        )
    }
}

const mapState = (state) => {
    return {
        content: state.wiki.content || {},
    }
}
const mapDispatch = (dispatch) => {
    return {
        loadContent: (title) => { dispatch(actions.fetchContent(title)) },
        push(to) {
            dispatch(push(to))
        },
    }
}


export default connect(mapState, mapDispatch)(Wiki)