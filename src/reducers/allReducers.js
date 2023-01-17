import React from 'react'
import {combineReducers} from 'redux'

const storeDataReducer = (state = null, action) => {
    switch (action.type) {
        case 'STORE':
            return action.data
        default:
            return state
    }
}

const storeTimeReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORETime':
            return [...state, action.data]
        case 'resetStore':
            return []
        default:
            return state
    }
}

const storeTempReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORETemp':
            return [...state, action.data]
        case 'resetStore':
                return []
        default:
            return state
    }
}

const storeHumdReducer = (state = [], action) => {
    switch (action.type) {
        case 'STOREHumd':
            return [...state, action.data]
        case 'resetStore':
            return []
        default:
            return state
    }
}

//#################################################################################

const selectReducer = (state = null, action) => {
    switch (action.type) {
        case 'select':
            return action.data
        default:
            return state
    }
}

const selectTimeReducer = (state = [], action) => {
    switch (action.type) {
        case 'selectTime':
            return [...state, action.data]

        case 'reset':
            return []

        default:
            return state
    }
}

const selectTempReducer = (state = [], action) => {
    switch (action.type) {
        case 'selectTemp':
            return [...state, action.data]

        case 'reset':
            return []

        default:
            return state
    }
}

const selectHumdReducer = (state = [], action) => {
    switch (action.type) {
        case 'selectHumd':
            return [...state, action.data]

        case 'reset':
            return []

        default:
            return state
    }
}

//######################################################################################################

const LLReducer = (state = {lat: null, lng: null}, action) => {
    switch (action.type) {
        case 'STORELL':
            return action.data
        default:
            return state
    }
}

//######################################################################################################

const allReducers = combineReducers({
    store_Data: storeDataReducer,
    time_Data: storeTimeReducer,
    temp_Data: storeTempReducer,
    humd_Data: storeHumdReducer,

    select_Data: selectReducer,
    selec_time_Data: selectTimeReducer,
    selec_temp_Data: selectTempReducer,
    selec_humd_Data: selectHumdReducer,

    LL_Data: LLReducer

})



export default allReducers