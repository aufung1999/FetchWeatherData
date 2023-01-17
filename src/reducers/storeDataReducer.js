const initialState = null

const storeDataReducer = (state = null, action) => {
    switch (action.type) {
        case 'STORE':
            // const newArray = [...state.data]; //Copying state array
            // newArray.splice(0, 0, action.data);
            //using splice to insert at an index

            return action.data
        default:
            return state
    }
}

export default storeDataReducer