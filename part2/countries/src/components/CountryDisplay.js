import React from 'react'

const CountryDisplay = ({countries, setFilterTerm}) => {
  if(countries.length > 10) return <p>Too many matches, specify another filter</p>
  if(countries.length === 1) return <CountryDetail country={countries[0]} />

  return <CountryList countries={countries} setFilterTerm={setFilterTerm}/>
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

const CountryList = ({countries, setFilterTerm}) => countries.map(country => 
  <ListItem key={country.name} country={country} setFilterTerm={setFilterTerm} />)

const ListItem = ({country, setFilterTerm}) => (
  <div>
    {country.name} <button onClick={() => setFilterTerm(country.name)}>show</button>
  </div>
)

export default CountryDisplay