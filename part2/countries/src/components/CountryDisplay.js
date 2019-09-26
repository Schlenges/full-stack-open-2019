import React, {useState} from 'react'

const CountryDisplay = ({countries, searchTerm}) => {
  const [selectedCountry, setSelectedCountry] = useState('')

  const matches = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  // const displayDetails = (country) => <CountryDetail country={country} />

  if(selectedCountry !== '') return <CountryDetail country={selectedCountry} />
  if(matches.length > 10) return <p>Too many matches, specify another filter</p>
  if(matches.length === 1) setSelectedCountry(matches[0])

  return <CountryList countries={matches} setSelectedCountry={setSelectedCountry}/>
}

const CountryDetail = ({country}) => {
return (
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
}


const CountryList = ({countries, setSelectedCountry}) => countries.map(country => 
  <ListItem country={country} setSelectedCountry={setSelectedCountry} />)

const ListItem = ({country, setSelectedCountry}) => (
  <div>
    {country.name} <button onClick={() => setSelectedCountry(country)}>show</button>
  </div>
)

export default CountryDisplay