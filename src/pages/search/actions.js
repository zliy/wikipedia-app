import { wikiFetch, WIKIURL } from '@/js/wikifetch'

export function requestSearch(keyword) {
    return function (dispatch) {
        return async function () {
            let json = await wikiFetch(keyword, WIKIURL.SEARCH)
            dispatch({ type: 'SEARCH/RESULT_RECEIVED', payload: json })
        }()
    }
}