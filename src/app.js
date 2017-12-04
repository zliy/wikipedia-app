import React from 'react'
import Explore from '@/explore/'
import {View as Saved} from '@/saved/'
import {View as History} from '@/history/'

import Wiki from '@/wiki/'



import { Route, Switch } from 'react-router'

export default function (props) {
    console.log('App rendered')
    return (
        <div id="app">
            <Switch>
                <Route path="/explore" component={Explore}></Route>
                <Route path="/saved" component={Saved}></Route>
                <Route path="/history" component={History}></Route>
                <Route path="/wiki/:idName" component={Wiki}></Route>
            </Switch>
        </div>
    )
}
