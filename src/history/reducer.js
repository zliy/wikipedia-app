import store from '@/store'
import { loadLocal } from './actions'


export default function (state = [], action) {
    switch (action.type) {
        case "HISTORY/LOAD_LOCAL": {
            store.dispatch(loadLocal())
            return state
        }
        case "HISTORY/LOCAL_LOADED": {
            state = action.payload
            return state
        }

        default:
            return state;
    }
}
