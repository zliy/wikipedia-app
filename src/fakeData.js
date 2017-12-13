import Dexie from 'dexie';
localStorage.setItem('savedItems', JSON.stringify(
    [
        { title: '公开密钥加密', },
        { title: '木星', },
        { title: 'React', },
        { title: '辽太宗', },
        { title: '銀翼殺手2049', },
        { title: '江苏省', },
        { title: 'JavaScript', },
        { title: '二进制', },
        { title: '史蒂夫·乔布斯', },
        { title: '时间复杂度', },
        { title: 'Google', },
        { title: '维基百科', },
        { title: 'Node.js', },
        { title: '马男波杰克', },
    ]
))
localStorage.setItem('historyItems', JSON.stringify(
    [
        { title: '赤道', time: Date.now() - 86400 * 365 * 1000 },
        { title: '史蒂夫·乔布斯', time: Date.now() - 86400 * 365 * 1000 },

        { title: 'Python', time: Date.now() - 86400 * 30 * 1000 },

        { title: 'Scheme', time: Date.now() - 86400 * 4 * 1000 },
        { title: 'React', time: Date.now() - 86400 * 4 * 1000 },
        { title: 'LISP', time: Date.now() - 86400 * 4 * 1000 },
        { title: 'Fortran', time: Date.now() - 86400 * 4 * 1000 },

        { title: '马男波杰克', time: Date.now() - 86400 * 3 * 1000 },

        { title: 'Ruby', time: Date.now() - 86400 * 2 * 1000 },
        { title: 'Node.js', time: Date.now() - 86400 * 2 * 1000 },

        { title: '维基百科', time: Date.now() - 86400 * 1000 },
        { title: 'Google', time: Date.now() - 86400 * 1000 },
        { title: '銀翼殺手2049', time: Date.now() - 86400 * 1000 },
        { title: '辽太宗', time: Date.now() - 86400 * 1000 },
        { title: '二进制', time: Date.now() - 86400 * 1000 },
        { title: '木星', time: Date.now() - 86400 * 1000 },
        { title: '公开密钥加密', time: Date.now() - 86400 * 1000 },

        { title: '时间复杂度', time: Date.now() - 10000 },
        { title: 'JavaScript', time: Date.now() - 10000 },
    ]
))


window.fakeCache = JSON.parse(localStorage.HTTP_CACHE || '{}')
window.savedItems = JSON.parse(localStorage.savedItems)
window.historyItems = JSON.parse(localStorage.historyItems)


/* 
let openReq = indexedDB.open('wikipedia')
openReq.onupgradeneeded = function (e) {
    console.log('idb: open onupgradeneeded')
    window.db = e.target.result
    var db = window.db
    if (!db.objectStoreNames.contains("savedItems")) {
        db.createObjectStore('savedItems', { autoIncrement: 'value' })
    }
    if (!db.objectStoreNames.contains("historyItems")) {
        let store = db.createObjectStore('historyItems', { autoIncrement: 'value' })
        store.createIndex('title', 'title',)
    }
}
openReq.onsuccess = function (e) {
    console.log('idb: open success')
    let db = window.db = e.target.result
    let store = db.transaction('historyItems', 'readwrite').objectStore('historyItems')

    // window.historyItems.forEach((title) => {
    //     store.add(title)
    // });

    store.index('title').getAll("时间复杂度").onsuccess=(e)=>{
        console.log('idb', e.target.result)
    }

}

 */

window.loadTestDataToIndexDB = function () {
    let db = new Dexie("wikipedia")
    db.version(1).stores({
        historyItems: "++, &title, time",
        savedItems: "++, &title"
    });
    db.open()


    db.historyItems.bulkAdd(window.historyItems)
        .then(() => console.log('bulkAdd success'))
        .catch((e) => console.log('bulkAdd fail', e))

    db.savedItems.bulkAdd(window.savedItems)
        .then(() => console.log('bulkAdd success'))
        .catch((e) => console.log('bulkAdd fail', e))

    // db.close()
}
// loadTestDataToIndexDB()


let db = new Dexie("wikipedia")
db.version(1).stores({
    historyItems: "++, &title, time",
    savedItems: "++, &title"
});
db.open()

db.historyItems.where("title").equals("Google").delete()
    .catch((e) => console.log(' fail', e))
db.historyItems.add({ title: "Google", time: 15 })
    .catch((e) => console.log(' fail', e))
db.savedItems.where("title").equals("Google").delete()




