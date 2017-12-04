import './fakeData'

import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, push } from 'react-router-redux'

import store, { history } from '@/store.js'

import '@/style.scss'


import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

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

