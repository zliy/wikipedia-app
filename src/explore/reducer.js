import store from '@/store'


export default function (state = {}, action) {
    switch (action.type) {
        case "EXPLORE/LOAD_LOCAL": {
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

