const defaultState = {
    inputingText: '',
    results: [],
    recentSearch: [],
}

export default function (state = defaultState, action) {
    const { payload } = action
    switch (action.type) {
        case "SEARCH/RESULT_RECEIVED": {
            let results = []
            for (let value of Object.values((payload.query && payload.query.pages) || {})) {
                results[value.index - 1] = value
            }
            console.log(results)
            return {
                ...state,
                results,
            }
        }

        default: {
            return state
        }
    }
}

