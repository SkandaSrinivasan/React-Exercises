import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')

  const [searchName, setSearchName] = useState('')

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const updateSearchName = (event) => {
    setSearchName(event.target.value)
  }
  const addContact = (evt) => {
    evt.preventDefault()
    let nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`This dude -> ${newName} already in yo`)
    }

    const newContact = { name: newName }
    setPersons(persons.concat(newContact))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search: <input value={searchName} onChange={updateSearchName} />
      </div>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={updateNewName} />
        </div>

        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayNames persons={persons} searchName={searchName}/>
    </div>
  )
}

const DisplayNames = ({persons,searchName}) => {
  let displayNames = []
  if(searchName === '')
      displayNames = persons.map(person => <li key={person.name}>{person.name}</li>)
  else{
    displayNames = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())).map(
      person => <li key={person.name}>{person.name}</li>)
  }
  console.log(displayNames)
  return ( <ul>
    {displayNames}
  </ul>
  )
}

export default App