import React from 'react'

const CountryDisplay = ({countries, setSearchTerm}) => {

  if(countries.length > 10) return <p>Too many matches, specify another filter</p>
  if(countries.length === 1) return <CountryDetail country={countries[0]} />

  return <CountryList countries={countries} setSearchTerm={setSearchTerm}/>
}

const CountryDetail = ({country}) => (
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


const CountryList = ({countries, setSearchTerm}) => countries.map(country => 
  <ListItem key={country.name} country={country} setSearchTerm={setSearchTerm} />)

const ListItem = ({country, setSearchTerm}) => (
  <div>
    {country.name} <button onClick={() => setSearchTerm(country.name)}>show</button>
  </div>
)

export default CountryDisplay