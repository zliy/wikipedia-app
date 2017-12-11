import React from 'react'
// import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import store from '@/store'

import Explore from '@/explore/'
import { View as Saved } from '@/saved/'
import { View as History } from '@/history/'
import Wiki from '@/wiki/'
import Settings from "@/settings/"

class App extends React.Component {
    constructor(props) {
        super(props)

    }
    componentWillMount() {
        // this.props.initSaved()
        store.dispatch({ type: 'SAVED/INIT_STATE' })
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
function mapDispatch(dispatch) {
    return {
        initSaved: () => dispatch({ type: 'SAVED/INIT_STATE' }),
    }
}
export default App