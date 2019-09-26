import React, {useState} from 'react'

const Countries = ({countries, searchTerm}) => {
  /* const [selectedCountry, setSelectedCountry] = useState('')

  const matches = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
  if(matches.length === 1) setSelectedCountry(matches[0])
  if(selectedCountry !== '') return <Country country={selectedCountry} />
  if(matches.length > 10) return <p>Too many matches, specify another filter</p>

  return matches.length > 10 ? 
    <p>Too many matches, specify another filter</p> : 
    matches.map(match => <ListItem key={match.name} country={match} setSelectedCountry={setSelectedCountry} />) */

  let showDetails = false

  const matches = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  
}

const ListItem = ({country, setSelectedCountry}) => (
  <div>
    {country.name} <button onClick={() => setSelectedCountry(country)}>show</button>
  </div>
)

const Country = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    <p>{country.capital}</p>
    <p>{country.population}</p>
    <h3>languages</h3>
    <ul>
      {country.languages.map((lang, i) => <li key={i}>{lang.name}</li>)}
    </ul>
    <img src={country.flag} alt="country flag" />
  </div>
)

export default Countries