import _ from 'lodash'
import db from '@/js/db'

/**
 * @param {string} keyword
 * @param {string} url
 * @returns {Promise}
 */

export function get(keyword, url) {
    const headers = new Headers();
    headers.append('Accept-Language', 'zh-cn')


    switch (url) {
        case WIKIURL.SUMMARY: {
            return db.summaryCache.get({ title: keyword }).then((item) => {
                if (item) {
                    return Promise.resolve(item)
                }
                const request = new Request(WIKIURL.SUMMARY(keyword))
                return fetch(request,{headers}).then((resp) => resp.json())
                    .then(json => {
                        db.summaryCache.put(json).catch((e) => { console.error(e) })
                        return json
                    })
            })
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
                return fetch(request,{headers}).then((resp) => resp.json())
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
                return fetch(request,{headers}).then((resp) => resp.json())
                    .then(json => {
                        db.wikiContentCache.put({ title: keyword, data: json }).catch((e) => { console.error(e) })
                        return json
                    })
            })
        }

        default:
            console.error('error：get default')
    }
}

export const WIKIURL = {
    SUMMARY: (q) => `https://zh.wikipedia.org/api/rest_v1/page/summary/${q}`,
    TOPREAD: (dataStr) => {
        let y = dataStr.substr(0, 4)
        let m = dataStr.substr(4, 2)
        let d = dataStr.substr(6, 2)
        return `https://zh.wikipedia.org/api/rest_v1/feed/featured/${y}/${m}/${d}`
    },
    CONTENT: (q) => `https://zh.wikipedia.org/w/api.php?origin=*&page=${q}&action=mobileview&format=json&noheadings=true&pilicense=any&prop=sections|text|lastmodified|lastmodifiedby|languagecount|id|protection|editable|displaytitle|thumb|description|image|revision|namespace&sectionprop=toclevel|line|anchor|level|number|fromtitle|index&sections=all&thumbwidth=640`,
    MORELIKE: (q) => `https://zh.wikipedia.org/w/api.php?origin=*&gsrsearch=morelike%3A${q}&action=query&continue=&exchars=525&exintro=1&exlimit=20&explaintext=&format=json&generator=search&gsrinfo=&gsrlimit=20&gsrnamespace=0&gsroffset=0&gsrprop=redirecttitle&gsrwhat=text&ns=ppprop&pilimit=20&piprop=thumbnail&pithumbsize=640&prop=pageterms|pageimages|pageprops|revisions|extracts&rrvlimit=1&rvprop=ids&wbptterms=description`,
}

get('公开密钥加密', WIKIURL.SUMMARY)

/* 
几种url：
条目summary
WIKI内容页面

各种图片

*/