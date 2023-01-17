const initialState = []

const storeTimeReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORETime':
            return [...state, action.data]
        default:
            return state
    }
}

export default storeTimeReducer