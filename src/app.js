import React from 'react'
// import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import store from '@/store'

import { View as Explore } from '@/explore/'
import { View as Saved } from '@/saved/'
import { View as History } from '@/history/'
import Wiki from '@/wiki/'
import Settings from "@/settings/"

class App extends React.Component {

    componentWillMount() {

        store.dispatch({ type: 'EXPLORE/LOAD_LOCAL' })
        store.dispatch({ type: 'SAVED/LOAD_LOCAL' })
        store.dispatch({ type: 'HISTORY/LOAD_LOCAL' })
        console.log('👉 componentWillMount')
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