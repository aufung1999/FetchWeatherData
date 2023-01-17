
const storeTempReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORETemp':
            return [...state, action.data]
        default:
            return state
    }
}

export default storeTempReducer