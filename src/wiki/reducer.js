


export default function (state = {}, action) {
    switch (action.type) {

        case 'WIKI/LOADING_CONTENT': {
            return state
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