import { combineReducers, createStore, applyMiddleware } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk'
import logger from "redux-logger"

import { reducer as savedReducer } from '@/pages/saved'
import { reducer as historyReducer } from '@/pages/history'
import { reducer as exploreReducer } from '@/pages/explore'
import { reducer as wikiReducer } from '@/pages/wiki'




const rootReducer = combineReducers({
    saved: savedReducer,
    history: historyReducer,
    explore: exploreReducer,
    wiki: wikiReducer,
    // historyWikisContent, // 返回时直接加载页面数据
})


const mwS = applyMiddleware( thunk, logger)
export default createStore(rootReducer, composeWithDevTools(mwS))


