import React, {useState, useEffect} from 'react'
import personsService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Notification = ({notification}) => {
  if(!notification) return null

  return (
    <div className={notification.error ? "error notification" : "success notification"}>
      {notification.message}
    </div>
  )
}

const Filter = ({setSearchTerm}) => (
  <div>
    filter shown with <input onChange={event => setSearchTerm(event.target.value)} />
  </div>
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

  const handleNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {setNotification(null)}, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    const newPerson = {
      name: newName,
      number: newNumber
    }

    existingPerson
      ? updatePerson({...existingPerson, number: newNumber})
      : personsService.create(newPerson)
          .then(res => {
            setPersons(persons.concat(res))
            handleNotification({message: `Added ${res.name}`, error: false})
            setNewName('')
            setNewNumber('')
          })
          .catch(err => handleNotification({message: JSON.stringify(err.response.data.error), error: true}))
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
          handleNotification({message: `Updated ${res.name}`})
        })
        .catch(err => {
          if(err.message === "Request failed with status code 404"){
            handleNotification({
              message: `Information of ${person.name} has already been removed from server`, 
              error: true
            })
          } else {console.log(err)}
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