const fillSearchList=()=>{
    if(search){
      setError("");


      const baseUrl="http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
      
      fetch(baseUrl+"?api="+api+"&q="+search)
        .then((response) => response.json())
        .then((data) =>{
          if(data.length===0){
            throw new Error('data length is 0');
          }
          let cities=[];
          for(let i=0; i<3 && i<data.length; i++){
            cities.push(data[i]);
          }
          setSearchingCities(cities);
        })
        .catch((e)=>{
          setSearchingCities([]);
          setError("Sorry! Searched city is not found.")
        })
    }else{
      setSearchingCities([]);
      setError("");
    }
    
  }