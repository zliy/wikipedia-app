import { wikiFetch, WIKIURL } from '@/js/wikifetch'
import db from '@/js/db'

export function loadLocal() {
    return function (dispatch) {
        dispatch({ type: 'SAVED/LOAD_LOCAL' })

        return db.savedItems.toArray()
            .then((items) => Promise.all(
                items.reduceRight((promises, aitem) => {
                    promises.push(wikiFetch(aitem.title, WIKIURL.SUMMARY))
                    return promises
                }, [])
            ))
            .then((jsons) => { dispatch({ type: 'SAVED/LOCAL_LOADED', payload: jsons }) })
    }
}

export function addNew(title) {
    return function (dispatch) {
        dispatch({
            type: 'SAVED/ADD_ITEM',
            payload: title
        })
        return (async function () {
            let json = await wikiFetch(title, WIKIURL.SUMMARY)
            dispatch({ type: 'SAVED/ITEM_SUMMARY_LOADED', payload: json })
        })()
    }
}



