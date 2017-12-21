import store from '@/store'
import { loadLocal } from './actions'
import db from '@/js/db'


export default function (state = {}, action) {
    switch (action.type) {
        case "HISTORY/LOAD_LOCAL": {
            store.dispatch(loadLocal())
            return state
        }
        case "HISTORY/LOCAL_LOADED": {

            return {
                ...state,
                historyItems: action.payload,
            }
        }
        case 'HISTORY/SHOWACTIONS': {

            return {
                ...state,
                actTargetID: action.payload.actTargetID,
            }
        }
        case 'HISTORY/HIDEACTIONS': {

            return {
                ...state,
                actTargetID: null,
            }
        }
        case 'HISTORY/DELETEITEM':{
            const { delTitles } = action.payload
            return {
                ...state,
                historyItems: state.historyItems.filter(({ summary: {title} }) => {
                    let shoundDel = delTitles.indexOf(title) !== -1
                    if (shoundDel) {
                        db.historyItems.where('title').equals(title).delete()
                    }
                    return !shoundDel
                }),
                actTargetID: null,
            }
        }
        case 'HISTORY/CLEAR': {
            // db.historyItems.clear()
            return {
                ...state,
                historyItems: []
            }
        }
        default:
            return state;
    }
}

/* example state */
const state = {


    history: {   // this is state
        historyItems: [
            { time: 1578987667, summary: { title: '' } },
            { time: 1578987667, summary: { title: '' } },
        ]
    }





}

