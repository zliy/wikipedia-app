import { get, WIKIURL } from '@/js/fetch'
import db from '@/js/db'

export function loadLocal() {
    return function (dispatch) {
        return db.savedItems.toArray()
            .then((items) => Promise.all(
                items.reduceRight((promises, aitem) => {
                    promises.push(get(aitem.title, WIKIURL.SUMMARY))
                    return promises
                }, [])
            ))
            .then((jsons) => { dispatch({ type: 'SAVED/LOCAL_LOADED', payload: jsons }) })
    }
}

