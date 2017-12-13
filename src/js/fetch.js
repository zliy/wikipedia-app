import _ from 'lodash'

/**
 * @param {string} keyword
 * @param {string} url
 * @returns {Promise}
 */
export function get(keyword, url) {
    switch (url) {
        case WIKIURL.SUMMARY: {
            if (_.get(window, [''])) {
                return new Promise((resolve, reject) => {
                    resolve(window.fakeCache.summary[keyword])
                })
            } else {
                console.log('fetch summary:', keyword)
                return fetch(WIKIURL.SUMMARY(keyword)).then((resp) => resp.json())
                    .then(json => {
                        _.set(window, ['fakeCache', 'summary', keyword], json)
                        localStorage.HTTP_CACHE = JSON.stringify(window.fakeCache)
                        return json
                    })
            }
            break;
        }
        default:
            console.log('error：get default')
    }
}

export const WIKIURL = {
    SUMMARY: (q) => `https://zh.wikipedia.org/api/rest_v1/page/summary/${q}`,
    CONTENT: (q) => `https//zh.wikipedia.org/w/api.php?origin=*&page=${q}&action=mobileview&format=json&noheadings=true&pilicense=any&prop=sections%7Ctext%7Clastmodified%7Clastmodifiedby%7Clanguagecount%7Cid%7Cprotection%7Ceditable%7Cdisplaytitle%7Cthumb%7Cdescription%7Cimage%7Crevision%7Cnamespace&sectionprop=toclevel%7Cline%7Canchor%7Clevel%7Cnumber%7Cfromtitle%7Cindex&sections=all&thumbwidth=640`,
}

get('公开密钥加密', WIKIURL.SUMMARY)

/* 
几种url：
条目summary
WIKI内容页面

各种图片

*/