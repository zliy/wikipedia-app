
export default function (state = window.historyItems, action) {
    switch (action.type) {
        case "HISTORY/FETCH_SUMMARY": {
            state = action.payload
            return state
        }

        default:
            return state;
    }
}
