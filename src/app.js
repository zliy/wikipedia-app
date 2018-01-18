import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
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
    handleAnimationEnter = (node) => {
    }
    handleAnimationEntered = () => {
        this.props.history.action == 'PUSH' && window.scroll(0, 0)
    }
    handleAnimationExit = (node) => {
        let pathname = this.props.location.pathname
        if (pathname.split('/')[1] === "fulllist" && this.props.history.action == 'PUSH') {
            let cardNode = node.querySelector('[data-clicked]')
            let listNode = cardNode.querySelector('.wiki-list')
            this.cardListTop = listNode.getBoundingClientRect().top
            document.querySelector('.fulllist .wiki-list').style.transform = `translateY(${this.cardListTop - 46}px)`
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
            let cardNode = node.querySelector('[data-clicked]')
            cardNode.style.transform = `translateY(-${this.cardListTop - 46}px)`
            document.querySelector('.fulllist .wiki-list').style.transform = `translateY(0px)`
            cardNode.style.clipPath = `polygon(0% 0%, 0% 300%, 0 300%, 0 70px, 100% 70px, 100% 670px, 0 670px, 0 300%, 100% 300%, 100% 0)`
            document.querySelector('.fulllist .wiki-list').style.clipPath = `polygon(0% 0%, 100% 0%, 100% 600px, 0% 600px)`
            cardNode.querySelector('footer').style.transform = `translateY(300px)`
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
                <CSSTransition key={key} timeout={3000}
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

export default App