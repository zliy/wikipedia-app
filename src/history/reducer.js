import store from '@/store'
import { loadLocal } from './actions'


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

