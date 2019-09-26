import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay'

const Search = ({setSearchTerm}) => (
  <p>
    find countries: <input onChange={e => setSearchTerm(e.target.value)} />
  </p>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data))
  }, [])

  return(
    <div>
      <Search setSearchTerm={setSearchTerm} />
      <CountryDisplay countries={countries} 
                      searchTerm={searchTerm}
      />
    </div>
  )
}

export default App