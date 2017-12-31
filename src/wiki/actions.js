import { get, WIKIURL } from '@/js/fetch'

/* export function loadContent(title) {
    return {
        type: 'WIKI/LOAD_CONTENT',
        payload: title,
    }
}
 */

export function fetchContent(title) {
    return function (dispatch) {
        dispatch({ type: "WIKI/LOADING_CONTENT" })

        return get(title, WIKIURL.CONTENT).then((json) => {
            dispatch({ type: "WIKI/CONTENT_LOADED", payload: { [title]: json.mobileview } })
        })
    }
}