import './fakeData'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import '@/style.scss'
import '@/pages/wiki/wikipedia.scss'
import store from '@/store.js'
import App from '@/app'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>

  , document.getElementById('root'))

window.oncontextmenu = function () { return false; }
