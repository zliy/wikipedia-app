import db from '@/js/db'

export default function (state = {}, action) {
    const { historyItems = [] } = state
    const { payload } = action
    switch (action.type) {
        case "HISTORY/LOAD_LOCAL": {
            // add animation state
            return state
        }

        case "HISTORY/LOCAL_LOADED": {
            return {
                ...state,
                historyItems: payload,
            }
        }

        case 'HISTORY/SHOWACTIONS': {
            return {
                ...state,
                actTargetID: payload.actTargetID,
            }
        }

        case 'HISTORY/HIDEACTIONS': {
            return {
                ...state,
                actTargetID: null,
            }
        }

        case 'HISTORY/DELETEITEM': {
            const { delTitles } = payload
            return {
                ...state,
                historyItems: historyItems.filter(({ summary: { title } }) => {
                    let shoundDel = delTitles.indexOf(title) !== -1
                    if (shoundDel) {
                        db.historyItems.where('title').equals(title).delete()
                    }
                    return !shoundDel
                }),
                actTargetID: null,
            }
        }

        case 'HISTORY/CLEAR': {
            // db.historyItems.clear()
            return {
                ...state,
                historyItems: []
            }
        }

        case 'HISTORY/PUTITEM': {
            const nextHistoryItems = historyItems.filter(v => v.summary.title !== payload.summary.title)
            nextHistoryItems.push(payload)
            return {
                ...state,
                historyItems: nextHistoryItems,
            }
        }


        case 'HISTROY/ITEM_SUMMARY_LOADED': {
            return {
                ...state,
                historyItems: historyItems.map((item) => {
                    if (item.summary.title === payload.title) {
                        return { ...item, summary: payload, }
                    }
                    return item
                }),
            }
        }
        default:
            return state;
    }
}

