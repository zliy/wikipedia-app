import db from '@/js/db'

// savedItems:
export default function (state = { actTargetID: null }, action) {
    const { payload } = action

    switch (action.type) {
        case 'SAVED/LOAD_LOCAL': {
            return state
        }
        case 'SAVED/LOCAL_LOADED': {
            return {
                ...state,
            savedItems: payload,
            }
        }
        case 'SAVED/SHOWACTIONS': {

            return {
                ...state,
                actTargetID: payload.actTargetID,
            }
        }
        case 'SAVED/HIDEACTIONS': {
            return {
                ...state,
                actTargetID: null,
            }
        }

        case 'SAVED/ADD_ITEM': {
            return {
                ...state,
                savedItems: [
                    { title: payload },
                    ...state.savedItems,
                ]
            }
        }
        case 'SAVED/ITEM_SUMMARY_LOADED': {
            return {
                ...state,
                savedItems: state.savedItems.map((item) => {
                    if (item.title === payload.title) {
                        return payload
                    }
                    return item
                })
            }
        }
        case 'SAVED/CLEAR': {
            db.savedItems.clear()
            return {
                ...state,
                savedItems: []
            }
        }
        case 'SAVED/DELETEITEM': {
            const { delTitles } = payload
            return {
                ...state,
                savedItems: state.savedItems.filter(({ title }) => {
                    let shoundDel = delTitles.indexOf(title) !== -1
                    if (shoundDel) {
                        db.savedItems.where('title').equals(title).delete()
                    }
                    return !shoundDel
                }),
                actTargetID: null,
            }
        }

        default:
            return state;
    }
}
