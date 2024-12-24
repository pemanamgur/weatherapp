import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import { FaSearch } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { LuCloudRainWind } from "react-icons/lu";
// import garnu weather icon lai



const Weather = () => {
    const inputRef = useRef();
    const [ weatherData, setWeatherData] = useState(false);
    const allIcons = {
      "01d" : clear_icon,
      "01n" : clear_icon,
      "02d" : cloud_icon,
      "02n" : cloud_icon,
      "03d" : cloud_icon,
      "03n" : cloud_icon,
      "04d" : drizzle_icon,
      "04n" : drizzle_icon,
      "09d" : rain_icon,
      "09n" : rain_icon,
      "10d" : rain_icon,
      "13d" : snow_icon,
      "13n" : snow_icon,
  }
    const search = async(city)=>{
      if(city === ""){
        alert("Please enter the name of city.")
        return
      }
      try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
        const res = await fetch(url)
        const data =await  res.json();
        console.log(data);
        console.log(data.weather[0].icon)
         const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity : data.main.humidity,
          windSpeed :data.wind.speed,
          temperature : Math.floor(data.main.temp),  
          location : data.name,
          icon : icon,
        })
      }catch(error){
        console.log(error)
      }
    }
    
    
    useEffect(()=>{
        search("London");
    },[])

  return (
    <div className='weather'>
       <div className="search-bar">
           <input type="text" placeholder='search' ref={inputRef} />
           <FaSearch  className='searchIcon' onClick={()=> search(inputRef.current.value)} />
       </div>
       <div className="weather-icon">
       {/* <IoIosSunny size={40} className='react-icon'/> */}
       <img src={weatherData.icon} alt="" />
         <p className='temperature'>{weatherData.temperature}*C</p>
         <p className='location'>{weatherData.location}</p>
         <div className="weather-data">
            <div className="col">
              <WiHumidity className='react-icon'/>
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
            <LuCloudRainWind />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind speed</span>
              </div>
            </div>
         </div>
       </div>
    </div>
  )
}

export default Weather
