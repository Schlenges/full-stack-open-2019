import React from 'react'
import Weather from './Weather'

const CountryList = ({countries, setFilterTerm}) => countries.map(country => 
  <ListItem key={country.name} country={country} setFilterTerm={setFilterTerm} />
)

const ListItem = ({country, setFilterTerm}) => (
  <div>
    {country.name} <button onClick={() => setFilterTerm(country.name)}>show</button>
  </div>
)

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

const CountryDisplay = ({countries, setFilterTerm}) => {
  if(countries.length > 10) return <p>Too many matches, specify another filter</p>
  if(countries.length === 1) return <CountryDetail country={countries[0]} />

  return <CountryList countries={countries} setFilterTerm={setFilterTerm}/>
}

export default CountryDisplay