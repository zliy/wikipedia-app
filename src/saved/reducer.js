



// savedItems:
export default function (state = [], action) {
    console.log("⭐️action: ", action)
    switch (action.type) {
        case 'FETCH_SUMMARY': {
            state = action.payload
            return state
        }
        default:
            return state;
    }
}

