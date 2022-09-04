import { useEffect, useState } from 'react';
import './App.css';
import Content from './components/Content';
import Forecast from './components/Forecast';
import Header from './components/Header';
import MainContext from './MainContext';
import Loader from './components/Loader';
import ForecastH from './components/ForecastH';
import ForecastSlider from './components/ForecastSlider';
const api = "gwuk0Vo77FgdmAve1ExiXrhOBPGGXFfC";
// const api="6sFcOjAM8fCZZ9EI01cy59sMHTM6AhdQ";
const open_api = process.env.REACT_APP_WEATHER_API;

function App() {

  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [cityName, setCityName] = useState("ankara");
  const [currentWeather, setCurrentWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [fiveDaysWeather, setFiveDaysWeather]=useState([]);
  const [dailyForecast, setDailyForecast]=useState([]);
  const [hourlyForecast, setHourlyForecast]=useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [color, setColor] = useState("#239AC9");
  const [focusSearch,setFocusSearch]=useState(false);

  useEffect(() => {
    getCurrentWeather();
  }, [cityName])
  
  const toggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const toggleModal = () => {
    setFocusSearch(true)
    setModalIsOpen(!modalIsOpen);
  }
  
  const setHourly=(d)=>{
    var arr=[];
    for(let i=0; i<8; i++){
      arr.push(d.list[i]);
    }
    setHourlyForecast(arr);
    setLoading(false);
    
  }

  const setDaily=(d)=>{

    let nextDayIndex=0;
    for(let i=1; i<9; i++){
      if(d.list[i].dt_txt.split(" ")[0]!==d.list[0].dt_txt.split(" ")[0]){
        nextDayIndex=i;
        break;
      }
    }
    var arr=[];
    for(let i=0; i<32; i+=8){
      var newArr2=[];
      newArr2.push(d.list[i+nextDayIndex+1])
      newArr2.push(d.list[i+nextDayIndex+4]);
      arr.push(newArr2);
    }
    // var newArr=[];
    // for(let i=1; i<32; i+=8){
    //   var newArr2=[];
    //   newArr2.push(arr[i]);
    //   newArr2.push(arr[i+3]);
    //   newArr.push(newArr2);
    // }
    // console.log(newArr)
    setDailyForecast(arr);
    setLoading(false);
  }

  const getFiveDaysWeather=()=>{
    setError("");
    setFiveDaysWeather([]);
    const baseUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + open_api;
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        const baseUrl2 = "http://api.openweathermap.org/data/2.5/forecast?" + "lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + open_api + "&lang=tr&units=metric";
        fetch(baseUrl2)
          .then((response) => response.json())
          .then((data) => {
            setFiveDaysWeather(data);
            setDaily(data);
            setHourly(data);
          })
          .catch((e) => {
            console.log(e.message);
          })
      })
      .catch((e) => {
        console.log(e.message);
      })
      
  }

  const getCurrentWeather = () => {
    setLoading(true);
    setError("");
    setCurrentWeather({})
    const baseUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + open_api;
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        const baseUrl2 = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + open_api + "&lang=tr&units=metric";
        fetch(baseUrl2)
          .then((response) => response.json())
          .then((data) => {
            setModalIsOpen(false)
            getFiveDaysWeather();
            setCurrentWeather(data);
          })
          .catch((e) => {
            setModalIsOpen(true)
            console.log(e.message);
          })
      })
      .catch((e) => {
        console.log("asdasd");
        setModalIsOpen(true)
        console.log(e.message);
      })
  }
  
  const data = {
    error,
    modalIsOpen,
    setModalIsOpen,
    toggleModal,
    cityName,
    setCityName,
    currentWeather,
    isSwitchOn,
    setIsSwitchOn,
    toggleSwitch,
    color,
    setColor,
    hourlyForecast,
    focusSearch,
    setFocusSearch
  }

  if (loading) {
    return (
      <div className='main-container'>
        <Loader />
      </div>
    )
  }
  return (
    <MainContext.Provider value={data}>
      <div className="App">
        {currentWeather?.weather && <div className='main-container'>
          <Header />
          <Content />
          {!isSwitchOn &&
            dailyForecast.map((d,index)=>(
              <Forecast key={index} d={d}/>
            ))}
          {isSwitchOn &&
            <ForecastSlider/>}
        </div>}
      </div>
    </MainContext.Provider>
  );
}

export default App;
