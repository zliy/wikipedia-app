import { combineReducers, createStore, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk'
import logger from "redux-logger"

import { reducer as savedReducer } from '@/saved'
import { reducer as historyReducer } from '@/history'
import { reducer as exploreReducer } from '@/explore'

export const history = createHistory()
const routerMW = routerMiddleware(history)

const rootReducer = combineReducers({
    rotuer: routerReducer,
    savedItems: savedReducer,
    historyItems: historyReducer,
    explored: exploreReducer
    // historyWikisContent, // 返回时直接加载页面数据
})


const mwS = applyMiddleware(routerMW, thunk, logger)
export default createStore(rootReducer, composeWithDevTools(mwS))
