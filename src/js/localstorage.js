
import { get, WIKIURL } from '@/js/fetch'

export function storageSavedToState() {
    return function (dispatch) {
        const titles = JSON.parse(localStorage.savedItems)
        return Promise.all(titles.map(
            (atitle) => get(atitle, WIKIURL.SUMMARY)
        ))
            .then((items) => dispatch({ type: "SAVED/LOCAL_LOADED", payload: items }))
    }
}

