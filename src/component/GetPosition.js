import React, { useState } from 'react'
import { useGeolocated } from "react-geolocated";
import { useDispatch } from 'react-redux';

function GetPosition() {

    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState('')

    function receiveValue(e){
        e.preventDefault()
        console.log('Clicked ' + inputValue);

        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+inputValue +'&key=AIzaSyAd-XY8yOLjTAtz4HVUjmpvvrjZy5HICJA'


        async function fetchText() {
            let response = await fetch(url);
            let data = await response.json();
            let {lat, lng} = data['results'][0]['geometry']['location']
            console.log(lat, lng);
            dispatch({type:'STORELL', data:{lat: lat, lng: lng}})
            return [lat, lng]
        }

        // var Data = fetchText().then(console.log('Data: ' + Data[0]))
        fetchText()
    }

    return (
        <div>
            <form onSubmit={receiveValue}>

                <input type='text' value = {inputValue} onChange={(e) => setInputValue(e.target.value)}></input>

                <input type="submit" value="Submit"></input>

            </form>
        </div>
    )
};

export default GetPosition