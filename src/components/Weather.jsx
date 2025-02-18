import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "02n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        
    }

    const search = async (city) =>{
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                country: data.sys.country,
                icon: icon,
            })
        }catch (error){

        }
    }

    useEffect(()=>{
        search("Mawlamyine");
    },[])


  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type="text" placeholder='Search' autoFocus />
            <img src={search_icon} alt="" />

        </div>
        <img src={clear_icon} alt="" className='weather-icon' />
        <p className='temperature'>16*C</p>
        <p className='location'>London</p>
        <p className='location_country'>UK</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon} alt="" />
                <div>
                    <p>91 %</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className='col'>
                <img src={wind_icon} alt="" />
                <div>
                    <p>3.6 Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Weather
