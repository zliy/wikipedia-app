import { combineReducers, createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { routerReducer, routerMiddleware, push } from 'react-router-redux'

import { reducer as savedReducer } from '@/saved'


export const history = createHistory()
const routerMiddleW = routerMiddleware(history)



const rootReducer = combineReducers({
    savedItems: savedReducer,
    // historyItems,

    // historyWikisContent, // 返回时直接加载页面数据

})

export default createStore(rootReducer, applyMiddleware(routerMiddleW, thunk))
