import Dexie from 'dexie';
const tableStruct = {
    historyItems: "++, &title, time",
    savedItems: "++, &title",
    summaryCache: "&title",
    moreLikeCache: "&title",
    topReadandPicCache: "&date",
    wikiContentCache: "&title",
    explored: "++, type, time",
}
const db = new Dexie("wikipedia")
db.version(1).stores(tableStruct);
db.open()

window.db = db
window.Dexie = Dexie

export default db
export { tableStruct }
