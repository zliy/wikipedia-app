


export default function (state = {}, action) {
    switch (action.type) {

        case 'WIKI/LOADING_CONTENT': {
            return state
        }
        case 'WIKI/CONTENT_LOADED': {
            return {
                ...state,
                content: action.payload,
            }
        }
        default:
            return state
    }
}