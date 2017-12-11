



// savedItems:
export default function (state = [], action) {
    switch (action.type) {
        case 'SAVED/INIT_STATE': {
            return state
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