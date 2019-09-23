import React, {useState, useEffect} from 'react'
import axios from 'axios'

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

const Persons = ({persons, searchTerm}) => persons.map(person => 
  <Person key={person.name} name={person.name} number={person.number} searchTerm={searchTerm} />
)

const Person = ({name, number, searchTerm}) => (
  name.toLowerCase().includes(searchTerm.toLowerCase()) ?
    <p>{name} {number}</p> :
    null
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    persons.map(person => {
      if(person.name === newName){
        return alert(`${newName} already exists`)
      }
      return setPersons(persons.concat({name: newName, number: newNumber}))
    })

    setNewName('')
    setNewNumber('')
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
      
      <Persons persons={persons} searchTerm={searchTerm} />

    </div>
  )
}

export default App