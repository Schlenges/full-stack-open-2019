import React from 'react'

const Persons = ({persons, searchTerm, deletePerson}) => persons.map(person => (
  person.name.toLowerCase().includes(searchTerm.toLowerCase())
    ? <Person key={person.name} person={person} deletePerson={deletePerson} />
    : null
  )
)

const Person = ({person, deletePerson}) => (
  <p>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>
)

export default Persons