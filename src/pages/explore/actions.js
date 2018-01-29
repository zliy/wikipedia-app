import { wikiFetch, WIKIURL } from '@/js/wikifetch'
import db from '@/js/db'
import { CARDTYPE } from '@/constants'

export function fetchNew() {
    return function (dispatch, getState) {
        dispatch({ type: 'EXPLORE/FETCH_NEW' })
        return (async function () {
            const fetchedCards = []
            const state = getState()
            const { explore: { explored } } = state

            {
                // Random
                let json = await wikiFetch('', WIKIURL.RANDOM)
                // 找出一个带缩略图的
                let items = Object.values(json.query.pages)
                let aItem = items.find(item => item.thumbnail) || items[0]
                const time = Date.now()
                db.explored.put({ type: 'random', time, title: aItem.title, })
                fetchedCards.unshift({ type: 'random', time, summary: aItem })
            }
            { // topRead
                let yestday = new Date(Date.now() - 86400 * 1000)
                let date = yestday.getFullYear() * 10000 + (yestday.getMonth() + 1) * 100 + yestday.getDate() + ''
                let isYTDTopReadShowed = explored.some((item) => item.type === 'topRead' && item.date === date)

                if (!isYTDTopReadShowed) {
                    let json = await wikiFetch(date, WIKIURL.TOPREAD)
                    const time = Date.now()
                    db.explored.put({ type: 'topRead', time, date })
                    fetchedCards.unshift({ type: 'topRead', date, items: json.mostread.articles })
                }
            }
            /* 
            { // morelike
                // let lastRead = history.historyItems.slice(-1)[0].summary.title
                // let json = await wikiFetch(title, WIKIURL.MORELIKE)
                // todo 

            } 
            */


            dispatch({ type: 'EXPLORE/NEW_FETCHED', payload: fetchedCards })
        })()
    }
}

export function loadLocal() {
    return function (dispatch) {
        dispatch({ type: 'EXPLORE/LOAD_LOCAL' })
        function itemReducer(memo, currItem) {
            switch (currItem.type) {
                case CARDTYPE.RANDOM:
                    memo.push(wikiFetch(currItem.title, WIKIURL.SUMMARY).then((summary) => {
                        return { type: currItem.type, summary, time: currItem.time }
                    }))
                    return memo
                case CARDTYPE.MORELIKE: {
                    // 加载原文summary，和morelike的文章（已经包括summary）
                    const gettings = Promise.all([
                        wikiFetch(currItem.title, WIKIURL.SUMMARY),
                        wikiFetch(currItem.title, WIKIURL.MORELIKE),
                    ])
                    memo.push(gettings.then(([summary, morelike]) => {
                        const items = []
                        for (let item of Object.values(morelike.query.pages)) {
                            items.push(item)
                        }
                        return { type: currItem.type, time: currItem.time, summary, items }
                    }))
                    return memo
                }
                case CARDTYPE.TOPREAD: {
                    memo.push(wikiFetch(currItem.date, WIKIURL.TOPREAD).then((resp) => {
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
