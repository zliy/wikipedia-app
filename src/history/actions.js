import { get, WIKIURL } from '@/js/fetch'
import db from '@/js/db'

export function loadLocal() {
    return function (dispatch) {
        dispatch({ type: 'HISTORY/LOAD_LOCAL' })

        return db.historyItems.toArray()
            .then((items) => Promise.all(
                items.map((aitem) => get(aitem.title, WIKIURL.SUMMARY)
                    .then((json) => ({ time: aitem.time, summary: json })))
            ))
            .then((timeAndSummarys) => { dispatch({ type: 'HISTORY/LOCAL_LOADED', payload: timeAndSummarys }) })
    }
}
