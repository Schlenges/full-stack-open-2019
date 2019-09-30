import React, {useState, useEffect} from 'react'
import personsService from './services/persons'

const Filter = ({setSearchTerm}) => (
  <div>
    filter shown with <input onChange={event => setSearchTerm(event.target.value)} />
  </div>
)

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={event => props.setNewName(event.target.value)} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={event => props.setNewNumber(event.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons, searchTerm, deletePerson}) => persons.map(person => (
  person.name.toLowerCase().includes(searchTerm.toLowerCase())
    ? <Person key={person.name} person={person} deletePerson={deletePerson} />
    : null
  )
)

const Person = ({person, deletePerson}) => (
  <p>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(res => setPersons(res))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    personsService.create(newPerson)
      .then(res => {
        persons.map(person => {
          if(person.name === res.name){
            return alert(`${res.name} already exists`)
          }
          return setPersons(persons.concat(res))
        })

        setNewName('')
        setNewNumber('')
      })
      .catch(err => console.log(err))
  }

  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}?`))
    return personsService.remove(person.id)
      .then(setPersons(persons.filter(p => p.id !== person.id)))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter setSearchTerm={setSearchTerm} />

      <h2>add new</h2>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      
      <h2>Numbers</h2>
      
      <Persons persons={persons} searchTerm={searchTerm} deletePerson={deletePerson}/>

    </div>
  )
}

export default App