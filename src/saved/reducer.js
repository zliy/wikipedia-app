
import { storageSavedToState } from '@/js/localstorage'


// savedItems:
export default function (state = [], action) {
    switch (action.type) {
        case 'SAVED/LOAD_LOCAL': {
            storageSavedToState()
            return state
        }
        case 'SAVED/LOCAL_LOADED': {
            return action.payload
        }
        case 'SAVED/SUMMARY_RECEIVED': {

            return state
        }

        default:
            return state;
    }
}

/* 
actions:
add
remove
clear

*/