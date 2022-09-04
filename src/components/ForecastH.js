import React, { useContext, useState, useEffect } from 'react'
import { BsFillSunFill } from 'react-icons/bs';

import MainContext from '../MainContext';
import lightCloud from "../images/light-cloud.png"
import nightCloud from "../images/night-cloud.png"
import rainCloud from "../images/rain-cloud.png"
import snowCloud from "../images/snow-cloud.png"
import sunCloud from "../images/sun-cloud.png"
import cloud from "../images/cloud.png"
import moon from "../images/moon.png"
import Sun from "../images/sun.png"
import Wind from "../images/wind.png"
import { RiSunFill, RiContrastDrop2Fill, RiWindyFill } from 'react-icons/ri';
const ForecastH = ({ f }) => {

    const { color } = useContext(MainContext);
    const [img, setImg] = useState(Sun);
    const [toggle,setToggle]=useState(false)
    useEffect(() => {
        getImage();
    }, [])
    const dayFormat = (txt) => {
        switch (new Date(txt).getDay()) {
            case 0:
                return "Paz";
            case 1:
                return "Pzt";
            case 2:
                return "Sal";
            case 3:
                return "Çar";
            case 4:
                return "Per";
            case 5:
                return "Cum";
            case 6:
                return "Cmt";
            default:
                return "Cmt";
        }
    }

    const timeFormat = (txt) => {
        var date = new Date(txt);
        var time = "";
        if (date.getHours() < 10) {
            time += "0" + date.getHours().toString();
        } else {
            time += date.getHours();
        }
        time += ":"
        if (date.getMinutes() < 10) {
            time += "0" + date.getMinutes().toString();
        } else {
            time += date.getMinutes();
        }
        return time;
    }

    const getImage = () => {
        var im = Sun;
        var iconCode = f.weather[0].icon.charAt(2);
        var weatherId = f.weather[0].id;
        if (weatherId >= 200 && weatherId <= 232) {
            im = lightCloud;
        } else if (weatherId >= 300 && weatherId <= 321) {
            im = rainCloud;
        } else if (weatherId >= 500 && weatherId <= 531) {
            im = rainCloud;
        } else if (weatherId >= 600 && weatherId <= 622) {
            im = snowCloud;
        } else if (weatherId === 800) {
            if (iconCode === 'n') {
                im = moon;
            } else {
                im = Sun;
            }
        } else if (weatherId >= 701 && weatherId <= 781) {
            im = (Wind);
        } else if (weatherId >= 802 && weatherId <= 804) {
            if (iconCode === 'n') {
                im = nightCloud;
            } else {
                im = cloud;
            }
        } else if (weatherId === 801) {
            if (iconCode === 'n') {
                im = nightCloud;
            } else {
                im = sunCloud;
            }
        }
        setImg(im)
    }

    const handleClick = (e) => {
        var forecasts = document.querySelectorAll(".forecast-h");
        for (let i = 0; i < forecasts.length; i++) {
            forecasts[i].classList.remove("f-h-active")
        }
        e.currentTarget.classList.add("f-h-active");
    }
    
    return (
        <div className='forecast-h' style={{ color: color }} onClick={(e)=>handleClick(e)}>
            <div className='f-h-day'>{dayFormat(f.dt_txt)}</div>
            <div className='f-h-hour'>{timeFormat(f.dt_txt)}</div>
            <div className='toggle-main'>
                <div className='f-h-img'><img src={img} alt="alt" /></div>
                <div className='f-h-degree'>{f.main.temp.toFixed(0)}°C</div>
            </div>
            <div className='f-h-toggle'>
                <div className='f-h-toggle-humidity'>
                    <RiContrastDrop2Fill className='f-h-icon'/>
                    <p className='f-h-humidity'>{f.main.humidity}%</p>
                </div>
                <div className='f-h-toggle-wind'>
                    <RiWindyFill className='f-h-icon'/>
                    <p className='f-h-wind'>{f.wind.speed} </p>
                    <span>km</span>
                </div>
            </div>
        </div>
    )
}

export default ForecastH