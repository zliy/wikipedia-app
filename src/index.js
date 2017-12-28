import './fakeData'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter, push } from 'react-router-redux'

import '@/style.scss'
import '@/wikipedia.scss'
import store, { history } from '@/store.js'
import App from '@/app'


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App></App>
    </ConnectedRouter>
  </Provider>

  , document.getElementById('root'))


// eslint-disable-next-line
// setTimeout(() => { if (location.pathname !== '/saved') location.replace('/saved') }, 1000)

window.oncontextmenu = function() { return false; }
window.store = store