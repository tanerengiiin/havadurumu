import React, { useContext } from 'react'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import { RiThunderstormsFill } from 'react-icons/ri';
import { RiSunFill,RiContrastDrop2Fill ,RiWindyFill} from 'react-icons/ri';
import { BsFillSunFill, BsFillCloudDrizzleFill, BsWind, BsFillCloudRainHeavyFill, BsSnow, BsFillCloudFill, BsFillCloudSunFill } from 'react-icons/bs';

import { TbWindmill } from 'react-icons/tb';
const Forecast = ({ d }) => {
  const dayFormat = (txt) => {
    switch (new Date(txt).getDay()) {
      case 0:
        return "Pazar";
      case 1:
        return "Pazartesi";
      case 2:
        return "Salı";
      case 3:
        return "Çarşamba";
      case 4:
        return "Perşembe";
      case 5:
        return "Cuma";
      case 6:
        return "Cumartesi";
      default:
        return "Cumartesi";
    }
  }

  const iconFormat = (d) => {
    let weatherId=d[0].weather[0].id;
    if (weatherId >= 200 && weatherId <= 232) {
      return <RiThunderstormsFill />;
    } else if (weatherId >= 300 && weatherId <= 321) {
      return <BsFillCloudDrizzleFill />;
    } else if (weatherId >= 500 && weatherId <= 531) {
      return <BsFillCloudRainHeavyFill />;
    } else if (weatherId >= 600 && weatherId <= 622) {
      return <BsSnow />;
    } else if (weatherId === 800) {
      return <RiSunFill />;
    } else if (weatherId >= 701 && weatherId <= 781) {
      return <BsWind />;
    } else if (weatherId >= 802 && weatherId <= 804) {
      return <BsFillCloudFill />;
    } else if (weatherId === 801) {
      return <BsFillCloudSunFill />;
    }
  }

  const handleClick=(e)=>{
    var forecasts=document.querySelectorAll(".forecast");
    for(let i=0; i<forecasts.length; i++){
      forecasts[i].classList.remove("f-active")
    }
    e.currentTarget.classList.add("f-active");
    
    
  }
  
  return (
    <div className='forecast' onClick={handleClick} >
      <div className='f-con'>
      <div className='f-left'>
        <div className='f-icon'>{iconFormat(d)}</div>
        <p className='f-text'>{dayFormat(d[0].dt_txt)}</p>
      </div>
      <p className='f-degree'>{d[1].main.temp_max.toFixed(0)}° <span className='f-degree-other'>{d[0].main.temp_min.toFixed(0)}°</span></p>
      </div>
      
      <div className='f-toggle'>
        <div className='f-toggle-humidity'>
          <RiContrastDrop2Fill/>{d[1].main.humidity}%
        </div>
        <div className='f-toggle-wind'>
        &nbsp;&nbsp;&nbsp;&nbsp;<RiWindyFill/>{d[1].wind.speed} km
        </div>
      </div>
    </div>
  )
}

export default Forecast