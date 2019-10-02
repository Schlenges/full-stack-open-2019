import React, {useState, useEffect} from 'react'
import personsService from './services/persons'

const Notification = ({notification}) => {
  if(!notification) return null

  return (
    <div className={notification.error ? "error" : "success"}>
      {notification.message}
    </div>
  )
}

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
  const [notification, setNotification] = useState()

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

    const existingPerson = persons.find(person => person.name === newName)

    existingPerson
      ? updatePerson({...existingPerson, number: newNumber})
      : personsService.create(newPerson)
          .then(res => {
            setPersons(persons.concat(res))
            setNotification({message: `Added ${res.name}`, error: false})
            setTimeout(() => {setNotification(null)}, 5000)
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

  const updatePerson = (person) => (
    window.confirm(`${person.name} is already added to the phonebook, replace the older number with a new one?`)
      ? personsService.update(person)
        .then(res => {
          setPersons(persons.map(p => p.id !== res.id ? p : res))
          setNotification({message: `Updated ${res.name}`})
          setTimeout(() => {setNotification(null)}, 5000)
        })
      : null
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />
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