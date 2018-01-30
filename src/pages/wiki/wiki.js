import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import { withRouter } from 'react-router-dom'
import TopNavBar from '@cpt/top-navbar/'
// import BottomNavBar from '@cpt/bottom-navbar/'
import PropTypes from 'prop-types'

import { putHistory } from './actions'
import loadingImg from '@/icon/loading.gif'
import debug from 'debug'

import SVG from 'react-inlinesvg';
import wikipediaW from '@/icon/wikipedia-w.svg'

let log = debug('⭐️Wiki:')

/* 
note: 图片闪烁的问题，位置不准确 */
class Wiki extends React.Component {

    shouldComponentUpdate({ content: nextContent }) {
        const { content } = this.props
        return content !== nextContent
    }
    componentWillMount() {
        const title = this.props.match.params.idName
        if (!this.props.content.id) {
            this.props.loadContent(title)
            log(title, 'fetching data')
            this.props.putHistory(title)
        }
        log(title, 'WillMount')
    }

    componentWillUnmount() {
        log(this.props.match.params.idName, 'Unmount')
        log(this.props.match.params.idName, this.props.history.action)
    }

    handleArticleClick = (e) => {
        if (e.target.nodeName === 'A') {
            let aHref = e.target.getAttribute("href")
            if (aHref.startsWith('/wiki/')) {
                e.preventDefault()
                this.props.history.push(aHref)
            }
        }
    }

    get wikiPageContent() {
        let { content } = this.props
        return content.sections && content.sections.reduce((prev, curr) => {
            let secHeader = (curr.line && curr.level) ? `<h${curr.level}>${curr.line}</h${curr.level}>` : ''
            let section = secHeader + curr.text
            return prev + section
        }, `<h1>${content.displaytitle}</h1><p>${content.description || ''}</p>`)
    }

    render() {
        log(this.props.match.params.idName, 'render')

        const { content, history } = this.props
        let isLoaded = content.id
        let pageCover = content.thumb && (
            <div className="wiki-page-cover">
                <img src={content.thumb.url} alt="page cover" />
            </div>
        )
        return (
            <main className="wiki" >
                <TopNavBar iconLeft={TopNavBar.i.back} leftContent="Back"
                    onLeftClick={() => { history.goBack() }}
                    iconRight={TopNavBar.i.search}>
                    <SVG src={wikipediaW} className="wlogo"></SVG>
                </TopNavBar>

                {
                    isLoaded ?
                        <div id="wiki-style">
                            <div id="content">
                                {pageCover}
                                <article className="content"
                                    dangerouslySetInnerHTML={{ __html: this.wikiPageContent }}
                                    onClick={this.handleArticleClick} />
                            </div>
                        </div>
                        :
                        <div className="loading">
                            <img src={loadingImg} alt="" />
                        </div>
                }
            </main>
        )
    }
}

const mapState = (state, ownProps) => {
    const contents = state.wiki.contents || {}
    return {
        content: contents[ownProps.match.params.idName] || {},
    }
}
const mapDispatch = (dispatch) => {
    return {
        loadContent: (title) => { dispatch(actions.fetchContent(title)) },
        putHistory: (title) => { dispatch(putHistory(title)) },
    }
}


export default withRouter(connect(mapState, mapDispatch)(Wiki))



class WikiToolBar extends React.Component {
    render() {
        return (
            <div>
                WikiToolBar
            </div>
        )
    }
}

WikiToolBar.propTypes = {
    isSaved: PropTypes.bool.isRequired,

}