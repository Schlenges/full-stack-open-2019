import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    const key = "c10582903f83bfc6c5b7da3cf54762d8"
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`
  
    axios.get(url)
      .then(res => setWeather(res.data))
  }, [city])

  if(!weather) return null

  return (
  <div>
    <h3>Weather in {city}</h3>
    <p><strong>temperature:</strong> {weather.main.temp} Celsius</p>
    <img alt={weather.weather[0].description} 
         src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}>
    </img>
    <p><strong>wind:</strong> {weather.wind.speed} mps</p>
  </div>
  )
}

export default Weather