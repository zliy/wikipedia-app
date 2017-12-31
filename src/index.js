import './fakeData'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import '@/style.scss'
import '@/wikipedia.scss'
import store, { history } from '@/store.js'
import App from '@/app'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>

  , document.getElementById('root'))


// eslint-disable-next-line
// setTimeout(() => { if (location.pathname !== '/saved') location.replace('/saved') }, 1000)

window.oncontextmenu = function () { return false; }
window.store = store
localStorage.debug = '⭐️Wiki:'