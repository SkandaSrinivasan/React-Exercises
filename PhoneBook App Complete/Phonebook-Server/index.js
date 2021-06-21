require('dotenv').config();
const express = require('express')
const app = express()

console.log(process.env.DBPASSWORD)
const morgan = require('morgan')

app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))



const Contact = require('./models/contact')


let persons =
    [
        {
            id: 1,
            name: "Skanda",
            number: "123-456-333"
        },
        {
            id: 2,
            name: "rando",
            number: "123-222-334"
        },
        {
            id: 3,
            name: "rando3",
            number: "222-334-223"
        }
    ]




app.get('/api/persons', (request, response) => {
    console.log('wtf is happening in get')
    Contact.find({}).then(contacts => {
       console.log(contacts) 
        response.json(contacts)
    })
})


app.get('/info', (request, response) => {
    response.send(`<p>PhoneBook has info for ${persons.length} people</p>
    <p> Request for info was received on ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
        if(contact)
            response.json(contact)
        else
            response.status(404).end()

    })
    .catch(error => {
        console.log(error)
        response.status(500).send({error : "malformatted id"})
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Contact.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    console.log(request.body)
    if (!person) {
        return response.status(400).json(
            { error: "Data missing from request" }
        ).end()
    }
    console.log(person)
        const newPerson = new Contact({
            name: person.name,
            number: person.number,
            date: new Date()
        })
        newPerson.save().then(savedNote => {
            return response.json(newPerson)
        })
    
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})