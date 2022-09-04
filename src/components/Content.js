import React, { useContext, useEffect, useState } from 'react'
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
import OpacityRoundedIcon from '@mui/icons-material/OpacityRounded';
import WindPowerRoundedIcon from '@mui/icons-material/WindPowerRounded';


const Content = () => {
  const [weatherId, setWeatherId] = useState();
  const [img, setImg] = useState(Sun);
  
  const { setColor,color,currentWeather } = useContext(MainContext);
  
  useEffect(() => {
    getImage();
  }, [])
  const getImage = () => {
    var body = document.querySelector("body");
    var im=Sun;
    var colorCode = "";
    var iconCode = currentWeather.weather[0].icon.charAt(2);
    var weatherId=currentWeather.weather[0].id;
    if (weatherId >= 200 && weatherId <= 232) {
      im=lightCloud;
      colorCode = "#756C98";
    } else if (weatherId >= 300 && weatherId <= 321) {
      im=rainCloud;
      colorCode = "#407CD7";
    } else if (weatherId >= 500 && weatherId <= 531) {
      im=rainCloud;
      colorCode = "#407CD7";
    } else if (weatherId >= 600 && weatherId <= 622) {
      im=snowCloud;
      colorCode = "#68B4D8";
    } else if (weatherId === 800) {
      if (iconCode === 'n') {
        im=moon;
      } else {
        im=Sun;
      }
      colorCode = "#239AC9";
    } else if (weatherId >= 701 && weatherId <= 781) {
      im=(Wind);
      colorCode = "#0EAB90";
    } else if (weatherId >= 802 && weatherId <= 804) {
      if (iconCode ==='n') {
        im=nightCloud;
      } else {
        im=cloud;
      }
      colorCode = "#5F9DCE";
    } else if (weatherId === 801) {
      if (iconCode === 'n') {
        im=nightCloud;
      } else {
        im=sunCloud;
      }
      colorCode = "#E1AD54";
    }
    if (iconCode === 'n') {
      colorCode = "#1B1D4A";
    }
    body.style.backgroundColor = colorCode;
    setColor(colorCode);
    setImg(im)
  }

  return (
    <div className='content'>
      <img src={img} alt="sunny" />
      <div className='now-forecast'>
        <p>{currentWeather.weather[0].description.charAt(0).toUpperCase() + currentWeather.weather[0].description.slice(1)}</p>
        <div className='now-forecast-header' >
          <h1>{currentWeather.main.temp.toFixed(0)}<span style={{ fontWeight: "500" }}>°C</span></h1>
          <div className='opt' style={{ color: color }}>
            <WindPowerRoundedIcon />
            <div className='opt-name' >
              <div className='opt-wind' style={{ fontWeight: "500" }}>{currentWeather.wind.speed.toFixed(1)} km</div>
            </div>
          </div>
          <div className='opt' style={{ color: color }}>
            <OpacityRoundedIcon />
            <div className='opt-name' style={{ fontWeight: "500" }}>{currentWeather.main.humidity.toFixed(0)}%</div>
          </div>
        </div>


      </div>
    </div>
  )


}

export default Content