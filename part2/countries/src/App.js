import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay'

const Search = ({setFilterTerm}) => (
  <p>
    find countries: <input onChange={e => setFilterTerm(e.target.value)} />
  </p>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data))
  }, [])

  /* useEffect(() => {
    const key = "c10582903f83bfc6c5b7da3cf54762d8"
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${filterTerm}&units=metric&APPID=${key}`
  
    axios.get(url)
      .then(res => setWeather(res.data))
  }, [filterTerm]) */

  const searchMatches = countries.filter(country =>
      country.name.toLowerCase().startsWith(filterTerm.toLowerCase())
    )

  return(
    <div>
      <Search setFilterTerm={setFilterTerm} />
      <CountryDisplay countries={searchMatches} 
                      setFilterTerm={setFilterTerm} 
      />
    </div>
  )
}

export default App