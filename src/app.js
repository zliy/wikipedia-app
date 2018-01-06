import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';



import store from '@/store'

import { View as Explore } from '@/pages/explore/'
import { View as Saved } from '@/pages/saved/'
import { View as History } from '@/pages/history/'
import { View as Wiki } from '@/pages/wiki/'
import Settings from "@/pages/settings/"

import { actions as exploreActs } from '@/pages/explore/'
import { actions as savedActs } from '@/pages/saved/'
import { actions as historyActs } from '@/pages/history/'
import { transitionTimeout } from 'react-transition-group/utils/PropTypes';

const defaultTransOpt = {
    transitionName: '',
    transitionLeaveTimeout: 500,
    transitionEnterTimeout: 500,
}
class AnimationApp extends React.Component {

    componentWillReceiveProps(nextProps) {
        const { history, location } = this.props

        let Timeout = 200
        // Timeout = 99999999

        const noamimation = ["/explore", "/saved", "/history",]
        let hasAnimation = true
        if (noamimation.includes(location.pathname)
            && noamimation.includes(nextProps.location.pathname)) {
            hasAnimation = false
        }

        let transitionName = history.action.toLowerCase()
        this.transitionOptions = {
            transitionName,
            transitionLeaveTimeout: Timeout,
            transitionEnterTimeout: Timeout,
            transitionEnter: hasAnimation,
            transitionLeave: hasAnimation,
        }
    }


    render() {
        const { location } = this.props
        return (
            <CSSTransitionGroup { ...(this.transitionOptions || defaultTransOpt) }>
                <Switch location={location} key={location.key}>
                    <Route exact path="/" render={() => (
                        <Redirect to="/explore" />
                    )} />
                    <Route path="/explore" component={Explore}></Route>
                    <Route path="/saved" component={Saved}></Route>
                    <Route path="/history" component={History}></Route>
                    <Route path="/settings" component={Settings}></Route>
                    <Route path="/wiki/:idName" component={Wiki}></Route>
                </Switch>
            </CSSTransitionGroup>
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