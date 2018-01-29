export default function (state = {}, action) {
    switch (action.type) {
        case "EXPLORE/LOAD_LOCAL": {
            return {
                ...state,
                isFetching: true,
            }
        }

        case "EXPLORE/LOCAL_LOADED": {
            return {
                ...state,
                explored: action.payload,
                isFetching: false,
            }
        }

        case "EXPLORE/FETCH_NEW": {
            return {
                ...state,
                isFetching: true,
            }
        }

        case "EXPLORE/NEW_FETCHED": {
            return {
                ...state,
                explored: [
                    ...action.payload,
                    ...state.explored,
                ],
                isFetching: false,
            }
        }
        default:
            return state;
    }
}

