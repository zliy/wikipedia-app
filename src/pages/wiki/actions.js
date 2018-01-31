import { wikiFetch, WIKIURL } from '@/js/wikifetch'

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
        return (async function () {
            let json
            try {
                json = await wikiFetch(title, WIKIURL.CONTENT)
                dispatch({ type: "WIKI/CONTENT_LOADED", payload: { [title]: json.mobileview } })
            } catch (e) {
                dispatch({type: "WIKI/ERROR_LOAD"})
            }
        })()
    }
}


export function putHistory(title) {
    return function (dispatch) {
        dispatch({
            type: 'HISTORY/PUTITEM',
            payload: {
                summary: { title },
                time: Date.now(),
            }
        })
        return (async function () {
            let json = await wikiFetch(title, WIKIURL.SUMMARY)
            dispatch({
                type: 'HISTROY/ITEM_SUMMARY_LOADED',
                payload: json,
            })
        })()
    }

}
