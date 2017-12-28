import db from '@/js/db'

export default function (state = {}, action) {
    switch (action.type) {
        case "HISTORY/LOAD_LOCAL": {
            // add animation state
            return state
        }
        
        case "HISTORY/LOCAL_LOADED": {
            return {
                ...state,
                historyItems: action.payload,
            }
        }
        
        case 'HISTORY/SHOWACTIONS': {
            return {
                ...state,
                actTargetID: action.payload.actTargetID,
            }
        }
        
        case 'HISTORY/HIDEACTIONS': {
            return {
                ...state,
                actTargetID: null,
            }
        }
        
        case 'HISTORY/DELETEITEM': {
            const { delTitles } = action.payload
            return {
                ...state,
                historyItems: state.historyItems.filter(({ summary: { title } }) => {
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
        default:
            return state;
    }
}

