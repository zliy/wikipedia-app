import store from '@/store'
import { loadLocal } from './actions'


export default function (state = {}, action) {
    switch (action.type) {
        case "EXPLORE/LOAD_LOCAL": {
            store.dispatch(loadLocal())
            return state
        }
        case "EXPLORE/LOCAL_LOADED": {

            return {
                ...state.explore,
                explored: action.payload,
            }
        }

        default:
            return state;
    }
}



// exmple
const example = {
    explore: {
        explored: [
            {type: 'random',summary:{}}
        ]
    }
}