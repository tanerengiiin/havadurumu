import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../MainContext';
import cities from "../cities.json"
import AutoComplete from './AutoComplete';

const Search = () => {
    const {focusSearch,setCityName, cityName } = useContext(MainContext);
    const [searchingCities, setSearchingCities]=useState([]);
    const handleSubmit = (e) => {
        if(e.key === 'Enter'){
            setCityName(e.target.value.toLowerCase());
        }
      }

      const handleChange=(e)=>{
        var arr=[];
        if(e.target.value.length===0){
          arr=[]
        }else{
          for(let i=0; i<81; i++){
          if(arr.length<3){
            var letters = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
            var city_name=cities[i].name;
            var target_name=e.target.value;
            city_name = city_name.replace(/(([İIŞĞÜÇÖ]))/g, function(letter){ return letters[letter]; })
            target_name=target_name.replace(/(([İIŞĞÜÇÖ]))/g, function(letter){ return letters[letter]; })
            if(city_name.toLowerCase().startsWith( target_name.toLowerCase())){
              arr.push(cities[i]);
            }
          }
        }
        }
        
        setSearchingCities(arr);
      }

      useEffect(()=>{
        if(focusSearch){
            document.querySelector(".search-input").focus()
        }
      },[])

  return (
    <div className='search-con'>
      <input className='search-input' onKeyDown={(e) => { handleSubmit(e) }} onChange={handleChange} type={"search"} placeholder="Search a city" />
      {searchingCities.map((city)=>(
        <AutoComplete key={city.id} city={city.name} setCityName={setCityName}/>
      ))}
    </div>
  )
}

export default Search