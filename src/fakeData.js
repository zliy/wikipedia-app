import Dexie from 'dexie';
import { tableStruct } from '@/js/db'

const DAYINMS = 86400 * 1000
const NOW = Date.now()

const savedItems = [
    { title: '马男波杰克', },
    { title: 'Node.js', },
    { title: '维基百科', },
    { title: 'Google', },
    { title: '时间复杂度', },
    { title: '史蒂夫·乔布斯', },
    { title: '二进制', },
    { title: 'JavaScript', },
    { title: '江苏省', },
    { title: '銀翼殺手2049', },
    { title: '辽太宗', },
    { title: 'React', },
    { title: '木星', },
    { title: '公开密钥加密', },
    { title: '帽柱木属', },
]

const historyItems = [
    { title: '赤道', time: NOW - DAYINMS * 365 },
    { title: '史蒂夫·乔布斯', time: NOW - DAYINMS * 365 },

    { title: 'Python', time: NOW - DAYINMS * 30 },

    { title: 'Scheme', time: NOW - DAYINMS * 4 },
    { title: 'React', time: NOW - DAYINMS * 4 },
    { title: 'LISP', time: NOW - DAYINMS * 4 },
    { title: 'Fortran', time: NOW - DAYINMS * 4 },

    { title: '马男波杰克', time: NOW - DAYINMS * 3 },

    { title: 'Ruby', time: NOW - DAYINMS * 2 },
    { title: 'Node.js', time: NOW - DAYINMS * 2 },

    { title: '维基百科', time: NOW - DAYINMS },
    { title: 'Google', time: NOW - DAYINMS },
    { title: '銀翼殺手2049', time: NOW - DAYINMS },
    { title: '辽太宗', time: NOW - DAYINMS },
    { title: '二进制', time: NOW - DAYINMS },
    { title: '木星', time: NOW - DAYINMS },
    { title: '公开密钥加密', time: NOW - DAYINMS },

    { title: '时间复杂度', time: NOW - 10000 },
    { title: 'JavaScript', time: NOW - 10000 },
]

const explored = [
    // random，picture，topRead, moreLike

    { type: 'random', time: NOW - DAYINMS * 10, title: '鹳科' },
    { type: 'random', time: NOW - DAYINMS * 2, title: '異特龍屬的種' },
    { type: 'topRead', time: NOW - DAYINMS - 1000, date:'20171223' },
    { type: 'moreLike', time: NOW - DAYINMS - 1000, title: '帽柱木属' },
    { type: 'random', time: NOW - DAYINMS, title: '诺伊许滕' },
    { type: 'random', time: NOW - 3600 * 1000, title: '帽柱木属' },
    { type: 'topRead', time: NOW - DAYINMS - 1000, date:'20171224' },
    
]


window.loadTestDataToIndexDB = function () {
    Dexie.delete('wikipedia').then(() => {
        const db = new Dexie("wikipedia")
        db.version(1).stores(tableStruct);
        db.open()
        db.historyItems.bulkPut(historyItems)
            .catch((e) => console.log('bulkAdd fail'))
        db.savedItems.bulkPut(savedItems)
            .catch((e) => console.log('bulkAdd fail'))
        db.explored.bulkPut(explored)
            .catch((e) => console.log('bulkAdd fail'))

        setTimeout(() => { window.location.reload() }, 100)
    }).catch((e) => { console.error(e) })
}
// loadTestDataToIndexDB()

// db.savedItems.add({ title: "before delete Google"})
//     .catch((e) => console.log(' fail', e))

/* 
let db = new Dexie("wikipedia")
db.version(1).stores({
    historyItems: "++, &title, time",
    savedItems: "++, &title"
});
db.open()

db.historyItems.where("title").equals("Google").delete()
    .catch((e) => console.log(' fail', e))

db.savedItems.where("title").equals("Google").delete()
 */



