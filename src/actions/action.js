export const storeAPIData = (data) => ({
    type: 'STORE',
    data:  data
})

export const storeTIMEData = (data) => ({
    type: 'STORETime',
    data:  data
})

export const storeTempData = (data) => ({
    type: 'STORETemp',
    data:  data
})

export const selectReducer = (data) => ({
    type: 'select',
    data:  data
})

export const selectTimeReducer = (data) => ({
    type: 'selectTime',
    data:  data
})

export const selectTempReducer = (data) => ({
    type: 'selectTemp',
    data:  data
})

export const selectHUmdReducer = (data) => ({
    type: 'selectHumd',
    data:  data
})

export const LLReducer = (data) => ({
    type: 'STORELL',
    data:  data
})

