import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { storeAPIData } from '../actions/action'

function FetchAPI() {

    const dispatch = useDispatch()

    const data = useSelector((state) => state.store_Data);
    const lat = useSelector((state) => state.LL_Data.lat);
    const lng = useSelector((state) => state.LL_Data.lng);


    useEffect(() => {
        if (data === null){
            fetch("http://api.openweathermap.org/data/2.5/forecast?lat=42.985900&lon=-81.294700&appid=26c761a61144d8cdc77681ad57881a08&units=metric")
            .then((response) => response.json())
            .then((json) => {
                dispatch({ type: "STORE", data: json })
                })
        }
    }, [data])

    useEffect(() => {
        dispatch({type:'resetStore'})
        if (lat !== null){
            console.log('lat: '+ lat, lng);
            fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon="+ lng +"&appid=26c761a61144d8cdc77681ad57881a08&units=metric")
            .then((response) => response.json())
            .then((json) => {
                dispatch({ type: "STORE", data: json })
                })
        }
    }, [lat, lng])
}

export default FetchAPI