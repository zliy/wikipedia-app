import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import store from '@/store'

import { View as Explore } from '@/pages/explore/'
import { View as Saved } from '@/pages/saved/'
import { View as History } from '@/pages/history/'
import { View as Wiki } from '@/pages/wiki/'
import { View as Search } from '@/pages/search/'
import Settings from "@/pages/settings/"
import FullList from "@/pages/fullList/"

import { actions as exploreActs } from '@/pages/explore/'
import { actions as savedActs } from '@/pages/saved/'
import { actions as historyActs } from '@/pages/history/'



class AnimationApp extends React.Component {
    componentWillUpdate() {
        const { history, location } = this.props
        this.exitingPageY = window.scrollY
    }
    TOPNAVHEIGHT = 46
    CARDHEADERHEIGHT = 70
    fullListPush = (node) => {
        let cardNode = node.querySelector('[data-clicked]')
        let cardListNode = cardNode.querySelector('.wiki-list')

        let cardNodeRect = cardNode.getBoundingClientRect()
        this.cardListRect = cardListNode.getBoundingClientRect() //note: code order

        let placeHolder = document.createElement('section')
        placeHolder.classList.add('card')
        placeHolder.style = `visibility: hidden; height: ${cardNodeRect.height}px `
        cardNode.before(placeHolder)

        cardNode.style.transform = `translateY(${cardNodeRect.top}px)`
        cardNode.style.position = `fixed`
        cardListNode.style.height = `${this.cardListRect.height}px`

        document.querySelector('.fulllist .wiki-list').style.transform = `translateY(${this.cardListRect.top - this.TOPNAVHEIGHT}px)`
    }
    fullListPushing = (node) => {
        // nodes
        let cardNode = node.querySelector('[data-clicked]')
        let cardListNode = cardNode.querySelector('.wiki-list')
        let fullListListNode = document.querySelector('.fulllist .wiki-list')
        // height style to
        let contentHeight = window.innerHeight - this.TOPNAVHEIGHT
        cardListNode.style.height = `${contentHeight}px`
        fullListListNode.style.webkitClipPath = `polygon(0% 0%, 100% 0%, 100% ${contentHeight}px, 0% ${contentHeight}px)`
        fullListListNode.style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${contentHeight}px, 0% ${contentHeight}px)`
        // position style to
        cardNode.style.transform = `translateY(-${this.CARDHEADERHEIGHT - this.TOPNAVHEIGHT}px)`
        fullListListNode.style.transform = 'translateY(0px)'
    }
    handleAnimationEnter = (node) => {
    }
    handleAnimationEntered = (node) => {
        let pathname = this.props.location.pathname
        if (pathname.split('/')[1] === "fulllist" && this.props.history.action == 'PUSH') {
            let fullListListNode = node.querySelector('.wiki-list')
            setTimeout(() => { fullListListNode.style = '' })
        }

        this.props.history.action == 'PUSH' && window.scroll(0, 0)
    }
    handleAnimationExit = (node) => {
        // let props = this.props
        // debugger
        let pathname = this.props.location.pathname
        if (pathname.split('/')[1] === "fulllist" && this.props.history.action == 'PUSH') {
            this.fullListPush(node)
        } else if (pathname.split('/')[1] === "fulllist" && this.props.history.action == 'PUSH') {

        } else {
            let transformTarget = node.querySelector('#wiki-style')
            if (transformTarget && this.props.history.action == 'POP') {
                transformTarget.style.transform = `translateY(-${this.exitingPageY + 1}px)`
            }
        }
    }
    handleAnimationExiting = (node) => {
        let pathname = this.props.location.pathname
        if (pathname.split('/')[1] === "fulllist" && this.props.history.action == 'PUSH') {
            this.fullListPushing(node)
        }
    }



    render() {
        const { location, history } = this.props

        let key = location.pathname
        const homepages = ['/', "/explore", "/saved", "/history",]
        if (homepages.includes(location.pathname)) {
            key = 'homes'
        }
        return (
            <TransitionGroup className={'animation-action-' + history.action.toLowerCase()}>
                <CSSTransition key={key} timeout={{enter: 300,exit: 280}}
                    classNames={'page'}
                    onExit={this.handleAnimationExit}
                    onExiting={this.handleAnimationExiting}
                    onEnter={this.handleAnimationEnter}
                    onEntered={this.handleAnimationEntered}
                >
                    <Switch location={location}>
                        <Route exact path="/" render={_ => <Redirect to="/explore" />} />
                        <Route path="/explore" component={Explore}></Route>
                        <Route path="/saved" component={Saved}></Route>
                        <Route path="/history" component={History}></Route>
                        <Route path="/settings" component={Settings}></Route>
                        <Route path="/search" component={Search}></Route>
                        <Route path="/wiki/:idName" component={Wiki}></Route>
                        <Route path="/fulllist/:type/:list" component={FullList}></Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>

        )
    }
}



class App extends React.Component {
    componentWillMount() {
        store.dispatch(exploreActs.loadLocal())
        store.dispatch(savedActs.loadLocal())
        store.dispatch(historyActs.loadLocal())
    }

    render() {
        return (
            <Route component={AnimationApp} />
        )
    }
}


export default withRouter(App)