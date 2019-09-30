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

  const searchMatches = countries.filter(country =>
      country.name.toLowerCase().startsWith(filterTerm.toLowerCase())
    )

  return(
    <div>
      <Search setFilterTerm={setFilterTerm} />
      <CountryDisplay countries={searchMatches} setFilterTerm={setFilterTerm} />
    </div>
  )
}

export default App