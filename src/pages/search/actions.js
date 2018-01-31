import { wikiFetch, WIKIURL } from '@/js/wikifetch'

export function requestSearch(keyword) {
    return function (dispatch) {
        return async function () {
            let json = await wikiFetch(keyword, WIKIURL.SEARCH)
            dispatch({ type: 'SEARCH/RESULT_RECEIVED', payload: json })
        }()
    }
}

export function changeInput(inputVal) {
    return {
        type: 'SEARCH/INPUT_CHANGE',
        payload: inputVal,
    }
}