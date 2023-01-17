import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux';

import { storeTIMEData } from '../actions/action';
import { storeTempData } from '../actions/action';
import { selectReducer } from '../actions/action';

import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';

import '../index.css'

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

function Display() {
    const dispatch = useDispatch()

    const [data_list, setData_lsit] = useState(null)
    const [isData, setIsData] = useState(false)
    const [chartData, setChartData]= useState(null)
    const [chart_humidityData, setChart_humidityData] = useState(null)
    const [chart_selectData, setChart_selectData] = useState(null)

    const data_Display = useSelector(state => state.store_Data)
    const time_data = useSelector(state => state.time_Data)
    const temp_data = useSelector(state => state.temp_Data)
    const humd_data = useSelector(state => state.humd_Data)

    const select_data = useSelector(state => state.select_Data)
    const select_time_data = useSelector(state => state.selec_time_Data)
    const select_temp_data = useSelector(state => state.selec_temp_Data)
    const select_humd_data = useSelector(state => state.selec_humd_Data)

    const [dropDownValue, setDropDownValue] = useState('')

    useEffect(() => {
        if (select_data !== null){
            reset()
            if (dropDownValue !== ''){
                select_data.map(element => {
                    console.log(element)

                    dispatch({ type: "selectTime", data: convertDTtoTime(element['dt']) })

                    dispatch({ type: "selectTemp", data: element['main'].temp })

                    dispatch({ type: "selectHumd", data: element['main'].humidity })

                    console.log('Dispatches UPDATED ');
                })
            }
        }
    }, [select_data])


    useEffect(() => {

        if (data_Display !== null){

            // console.log('data list: ' + JSON.stringify(data_Display, null, 1))

            setData_lsit(prev => data_Display['list'])

            setIsData(true)

            if (time_data.length === 0){

                data_Display['list'].map((element) => {

                    dispatch(storeTIMEData(convertDTtoTime(element['dt'])));

                    dispatch(storeTempData(element['main'].temp));

                    dispatch({ type: "STOREHumd", data: element['main'].humidity })
                })
            }

        }
    }, [data_Display])

    const convertDTtoTime = (dt) => {
        var date = new Date(dt * 1000);

        var dates = date.getDate();
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = dates + ':' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return formattedTime
    }

    useEffect(() => {

        setChartData( {

            labels:time_data,

            datasets:[
              {
                label:"Temperature",
                data:temp_data,
              }
            ]

          })

        setChart_humidityData(
            {

                labels:time_data,

                datasets:[
                  {
                    label:"Humidity",
                    data:humd_data,
                  }
                ]
              }
        )

    }, [time_data])

    useEffect(() => {

        setChart_selectData(
            {

                labels:select_time_data,

                datasets:[
                  {
                    label:"select Temp",
                    data:select_temp_data,
                  }
                ]
              }
        )

        console.log('chart select'+chart_selectData);

    }, [select_time_data])

    const list_out = () => {

        return data_list.map((element, index) => {

            const time_data = convertDTtoTime(element['main'].dt)

            return (<li key={"display-li-" + index} about={"display-li-" + index}>

                {index} TIME = { time_data } humidity = {element['main'].humidity} temperature = {element['main'].temp}

                </li>)
        })
    }

    console.log(dropDownValue);

    const whichDay = (a, b) => {
        var date = new Date(a * 1000);

        var dateDate = date.getDate()

        return dateDate + b
    }

    const displayWhichDay = () => {
        // eslint-disable-next-line default-case
        // eslint-disable-next-line default-case
        switch(dropDownValue){
            case '':
                console.log('Nothing');
                break
            case 'today':

                // console.log('1');

                const today = whichDay(data_list[0]['dt'], 0)

                // console.log(today);

                const today_data = data_list.filter(element => {

                    if (whichDay(element['dt'], 0) === today ){

                        // setSelectData(prev => [...prev, element])           *************soo wrong************
                        return element

                    }

                })

                // console.log(today_data);

                return today_data

            case 'tmr':
                console.log('2');

                const tmr = whichDay(data_list[0]['dt'], 1)

                const tmr_data = data_list.filter(element => {

                    if (whichDay(element['dt'], 0) === tmr ){

                        return element

                    }

                })

                return tmr_data

            case '2 days later':
                console.log('3');

                const two_days_later = whichDay(data_list[0]['dt'], 2)

                const two_days_later_data = data_list.filter(element => {

                    if (whichDay(element['dt'], 0) === two_days_later ){

                        return element

                    }

                })

                return two_days_later_data

            case '3 days later':
                console.log('4');

                const three_days_later = whichDay(data_list[0]['dt'], 3)

                const three_days_later_data = data_list.filter(element => {

                    if (whichDay(element['dt'], 0) === three_days_later ){

                        return element

                    }

                })

                return three_days_later_data
        }
    }

    useEffect(() => {
        var get_data = displayWhichDay()

        console.log(get_data);

        if ( get_data !== undefined){

            dispatch(selectReducer(get_data))

        }

    }, [dropDownValue])

    const reset = () => {
        dispatch({type: 'reset'})
    }

  return (
    <div className='container'>

            {isData?
            <div >
                {/* {list_out()} */}
            </div>

            :   null}
        <div className='main_wrapper'>
            {(chartData === null)?
                null
            :   <div style={{padding:"20 px", flexDirection:"row", display:'flex'}}>
                    <div className='canvas_wrapper'>
                        <Line data={chartData} />
                    </div>

                    <div className='canvas_wrapper'>
                        <Line data={chart_humidityData} />
                    </div>
                </div>}

        </div>

        <select name="select-day" id="select-day" onChange={e => setDropDownValue(e.target.value) } >
            <option value="today">today</option>
            <option value="tmr">tmr</option>
            <option value="2 days later">2 days later</option>
            <option value="3 days later">3 days later</option>
        </select>

        {/* <div className='main_wrapper'> */}
            <div className='canvas_wrapper'>
                {(chart_selectData !== null)? <Line data={chart_selectData}/> : null}
            </div>
            <div>

            </div>
        {/* </div> */}


    </div>
  )
}

export default Display