import { get, WIKIURL } from '@/js/fetch'
import db from '@/js/db'
import { CARDTYPE } from '@/constants'

export function loadLocal() {
    return function (dispatch) {

        function itemMapper(memo, mappingItem) {
            switch (mappingItem.type) {
                case CARDTYPE.RANDOM:
                    memo.push(get(mappingItem.title, WIKIURL.SUMMARY).then((summary) => {
                        return { type: mappingItem.type, summary }
                    }))
                    return memo
                default:
                    throw new Error('unknow cardtype')
            }
        }

        return db.explored.toArray()
            .then((items) => Promise.all(items.reduceRight(itemMapper, [])))
            .then((timeAndSummarys) => { dispatch({ type: 'EXPLORE/LOCAL_LOADED', payload: timeAndSummarys }) })
    }
}
