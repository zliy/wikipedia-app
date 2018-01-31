


export default function (state = {}, action) {
    switch (action.type) {

        case 'WIKI/ERROR_LOAD': {
            return {
                ...state,
                error: true,
            }
        }
        case 'WIKI/LOADING_CONTENT': {
            return {
                ...state,
                error: false
            }
        }
        case 'WIKI/CONTENT_LOADED': {
            return {
                ...state,
                contents: {
                    ...(state.contents ? state.contents : {}),
                    ...action.payload,
                }
            }
        }
        default:
            return state
    }
}