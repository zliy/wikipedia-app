/**
 * @description 封装网络请求，代理请求的本地缓存
*/

import db from '@/js/db'

export function wikiFetch(keyword, url) {
    const headers = new Headers();
    headers.append('Accept-Language', 'zh-cn')

    switch (url) {
        case WIKIURL.SUMMARY: {
            return (async function () {
                let cachedItem = await db.summaryCache.get({ title: keyword })
                if (cachedItem) {
                    return cachedItem
                }
                const request = new Request(WIKIURL.SUMMARY(keyword))
                let resp = await fetch(request, { headers })
                let json = await resp.json()
                db.summaryCache.put(json).catch((e) => { console.error(e) })
                return json
            })()
        }

        case WIKIURL.RANDOM: {
            return (async function () {
                let fetchResp = await fetch(WIKIURL.RANDOM())
                return await fetchResp.json()
            })()
        }

        case WIKIURL.MORELIKE: {
            return db.moreLikeCache.get({ title: keyword }).then((item) => {
                if (item) {
                    return Promise.resolve(item.data)
                }

                return fetch(WIKIURL.MORELIKE(keyword)).then((resp) => resp.json())
                    .then(json => {

                        db.moreLikeCache.put({ title: keyword, data: json }).catch((e) => { console.error(e) })
                        return json
                    })
            })
        }

        case WIKIURL.TOPREAD: {
            return db.topReadandPicCache.get({ date: keyword }).then((item) => {
                if (item) {
                    return Promise.resolve(item.data)
                }
                const request = new Request(WIKIURL.TOPREAD(keyword))
                return fetch(request, { headers }).then((resp) => resp.json())
                    .then(json => {
                        db.topReadandPicCache.put({ date: keyword, data: json }).catch((e) => { console.error(e) })
                        return json
                    })
            })
        }

        case WIKIURL.CONTENT: {

            return db.wikiContentCache.get({ title: keyword }).then((item) => {
                if (item) {
                    return Promise.resolve(item.data)
                }
                const request = new Request(WIKIURL.CONTENT(keyword))
                return fetch(request, { headers }).then((resp) => resp.json())
                    .then(json => {
                        db.wikiContentCache.put({ title: keyword, data: json }).catch((e) => { console.error(e) })
                        return json
                    })
            })
        }

        case WIKIURL.SEARCH: {
            return async function () {
                const request = new Request(WIKIURL.SEARCH(keyword))
                return await fetch(request, { headers }).then(resp => resp.json())
            }()
        }
        default:
            console.error('error: wikiFetch default')
    }
}

export const WIKIURL = {
    SUMMARY: (q) => `https://zh.wikipedia.org/api/rest_v1/page/summary/${q}`,
    RANDOM: () => `https://zh.wikipedia.org/w/api.php?origin=*&action=query&exchars=525&exintro=1&exlimit=8&explaintext=&format=json&generator=random&grnfilterredir=nonredirects&grnlimit=8&grnnamespace=0&pilimit=8&piprop=thumbnail&pithumbsize=640&prop=extracts%7Cpageterms%7Cpageimages%7Cpageprops%7Crevisions&rvprop=ids&wbptterms=description`,
    TOPREAD: (dateStr) => {
        let y = dateStr.substr(0, 4)
        let m = dateStr.substr(4, 2)
        let d = dateStr.substr(6, 2)
        return `https://zh.wikipedia.org/api/rest_v1/feed/featured/${y}/${m}/${d}`
    },
    CONTENT: (q) => `https://zh.wikipedia.org/w/api.php?origin=*&page=${q}&action=mobileview&format=json&noheadings=true&pilicense=any&prop=sections|text|lastmodified|lastmodifiedby|languagecount|id|protection|editable|displaytitle|thumb|description|image|revision|namespace&sectionprop=toclevel|line|anchor|level|number|fromtitle|index&sections=all&thumbwidth=640`,
    MORELIKE: (q) => `https://zh.wikipedia.org/w/api.php?origin=*&gsrsearch=morelike%3A${q}&action=query&continue=&exchars=525&exintro=1&exlimit=20&explaintext=&format=json&generator=search&gsrinfo=&gsrlimit=20&gsrnamespace=0&gsroffset=0&gsrprop=redirecttitle&gsrwhat=text&ns=ppprop&pilimit=20&piprop=thumbnail&pithumbsize=640&prop=pageterms|pageimages|pageprops|revisions|extracts&rrvlimit=1&rvprop=ids&wbptterms=description`,
    SEARCH: (q) => `https://zh.m.wikipedia.org/w/api.php?origin=*&gpssearch=${q}&srsearch=${q}&action=query&continue=&coprop=type|dim&format=json&generator=prefixsearch&gpslimit=24&gpsnamespace=0&list=search&pilimit=24&piprop=thumbnail&pithumbsize=120&prop=pageterms|pageimages|revisions|coordinates&redirects=1&rvprop=ids&srinfo=suggestion&srlimit=1&srnamespace=0&sroffset=0&srprop=&srwhat=text&wbptterms=description`,
}

// wikiFetch('公开密钥加密', WIKIURL.SUMMARY)

/* 
几种url：
条目summary
WIKI内容页面

各种图片

*/