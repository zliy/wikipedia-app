import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import store from '@/store'

import { View as Explore } from '@/explore/'
import { View as Saved } from '@/saved/'
import { View as History } from '@/history/'
import { View as Wiki } from '@/wiki/'
import Settings from "@/settings/"

import { actions as exploreActs } from '@/explore/'
import { actions as savedActs } from '@/saved/'
import { actions as historyActs } from '@/history/'



class App extends React.Component {
    componentWillMount() {
        store.dispatch(exploreActs.loadLocal())
        store.dispatch(savedActs.loadLocal())
        store.dispatch(historyActs.loadLocal())
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (
                    <Redirect to="/explore" />
                )} />
                <Route path="/explore" component={Explore}></Route>
                <Route path="/saved" component={Saved}></Route>
                <Route path="/history" component={History}></Route>
                <Route path="/settings" component={Settings}></Route>
                <Route path="/wiki/:idName" component={Wiki}></Route>
            </Switch>
        )
    }
}

export default App