import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryDisplay = ({countries, setFilterTerm, weatherData, setWeatherData}) => {
  if(countries.length > 10) return <p>Too many matches, specify another filter</p>
  if(countries.length === 1) return <CountryDetail country={countries[0]} />

  return <CountryList countries={countries} setFilterTerm={setFilterTerm}/>
}

const CountryDetail = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>languages</h3>
    <ul>
      {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
    </ul>
    <img src={country.flag} alt="country flag" />
    <Weather city={country.capital} />
  </div>
)

const Weather = ({city}) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    const key = "c10582903f83bfc6c5b7da3cf54762d8"
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`
  
    axios.get(url)
      .then(res => setWeather(res.data))
  }, [city])

  if(!weather) return <div></div>

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


const CountryList = ({countries, setFilterTerm}) => countries.map(country => 
  <ListItem key={country.name} country={country} setFilterTerm={setFilterTerm} />
)

const ListItem = ({country, setFilterTerm}) => (
  <div>
    {country.name} <button onClick={() => setFilterTerm(country.name)}>show</button>
  </div>
)

export default CountryDisplay