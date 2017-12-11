export function getSummary(title) {
    return function (dispatch) {
        get().then(() => dispatch({ "SAVED/SUMMARY_RECEIVED" }))
    }
}