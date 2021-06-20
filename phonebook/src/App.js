import axios from 'axios'
import React, { useState, useEffect } from 'react'
import contactService from './services/contacts'
const App = () => {

  

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [searchName, setSearchName] = useState('')

  const [number, setNumber] = useState('')

  useEffect(() => {
    contactService
      .getAllContacts()
      .then((initialContacts)=>{
        setPersons(initialContacts)
      })
  }, [])

  const refreshContacts = () => {
    contactService
      .getAllContacts()
      .then((initialContacts)=>{
        setPersons(initialContacts)
      })
  }

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const updateSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const updateNumber = (event) => {
    setNumber(event.target.value)
  }

  const updatePersons = () => {
    setPersons(persons)
  }
  

  const addContact = (evt) => {
    evt.preventDefault()
    let nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      const alertResponse = window.confirm(`This dude -> ${newName} already in yo. Update number?`)
      const contact = persons.find(contact => contact.name === newName)
      const changedContact = {...contact, number: number}
      if(alertResponse){
        console.log('alert')
        contactService
          .updateContact(contact.id, changedContact).then(cont => refreshContacts())
      }
      return
     }
    
    const newContact = { name: newName , number}

      contactService.createContact(newContact).then(
        (returnedContact) => {
        setPersons(persons.concat(returnedContact))
      }
    )
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
          Number: <input value={number} onChange={updateNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={persons} searchName={searchName} updatePersons={refreshContacts}/>
    </div>
  )
}

const Contacts = ({persons,searchName,updatePersons}) => {
  let displayNames = []
  if(searchName === '')
      displayNames = persons.map(person => <li key={person.name}>{person.name}: {person.number} 
      <DeleteButton id={person.id} upFunc={updatePersons}/></li>)
  else{
    displayNames = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())).map(
      person => <li key={person.name}>{person.name}: {person.number} <DeleteButton id={person.id} upFunc={updatePersons} /></li>)
  }
  console.log(updatePersons)
  return ( <ul>
    {displayNames}
  </ul>
  )
}

const DeleteButton = (({id, upFunc}) => {
  

  const delContact = (id) => {
    console.log("delete is called");
    console.log(typeof(upFunc))
    contactService.deleteContact(id).then(upFunc
      )
  }
  return (<button onClick={() => delContact(id)} >Delete</button>)
}) 

export default App