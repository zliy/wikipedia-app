import { get, WIKIURL } from '@/js/fetch'
import db from '@/js/db'
import { CARDTYPE } from '@/constants'

export function loadLocal() {
    return function (dispatch) {

        function itemReducer(memo, currItem) {
            switch (currItem.type) {
                case CARDTYPE.RANDOM:
                    memo.push(get(currItem.title, WIKIURL.SUMMARY).then((summary) => {
                        return { type: currItem.type, summary, time: currItem.time }
                    }))
                    return memo
                case CARDTYPE.MORELIKE: {
                    // 加载原文summary，和morelike的文章（已经包括summary）
                    const gettings = Promise.all([
                        get(currItem.title, WIKIURL.SUMMARY),
                        get(currItem.title, WIKIURL.MORELIKE),
                    ])
                    memo.push(gettings.then(([summary, morelike]) => {
                        const items = []
                        for (let [key, item] of Object.entries(morelike.query.pages)) {
                            items.push(item)
                        }
                        return { type: currItem.type, time: currItem.time, summary, items }
                    }))
                    return memo
                }
                case CARDTYPE.TOPREAD: {
                    memo.push(get(currItem.date, WIKIURL.TOPREAD).then((resp) => {
                        return { type: currItem.type, date: currItem.date, items: resp.mostread.articles }
                    }))
                    return memo
                }
                default:
                    throw new Error('unknow cardtype')
            }
        }

        return db.explored.toArray()
            .then((items) => Promise.all(items.reduceRight(itemReducer, [])))
            .then((timeAndSummarys) => { dispatch({ type: 'EXPLORE/LOCAL_LOADED', payload: timeAndSummarys }) })
    }
}
