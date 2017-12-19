import store from '@/store'
import { loadLocal } from './actions'
import db from '@/js/db'

// savedItems:
export default function (state = { actTargetID: null }, action) {
    switch (action.type) {
        case 'SAVED/LOAD_LOCAL': {
            store.dispatch(loadLocal())
            return state
        }
        case 'SAVED/LOCAL_LOADED': {
            return {
                ...state,
                savedItems: action.payload,
            }
        }
        case 'SAVED/SHOWACTIONS': {

            return {
                ...state,
                actTargetID: action.payload.actTargetID,
            }
        }
        case 'SAVED/HIDEACTIONS': {
            return {
                ...state,
                actTargetID: null,
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
            const { delTitles } = action.payload
            return {
                ...state,
                savedItems: state.savedItems.filter(({ title }) => {
                    let shoundDel = delTitles.indexOf(title) !== -1
                    if (shoundDel) {
                        // db.savedItems.where('title').equals(title).delete()
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

/* example state */
const state = {


    saved: {   // this is state
        actTargetID: 'titleString',
        savedItems: [
            {},
            {},
            // summarys
        ]
    }



}

