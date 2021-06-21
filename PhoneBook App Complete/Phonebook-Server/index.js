/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config()


const express = require('express')
const app = express()


app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

const Contact = require('./models/contact')

app.get('/api/persons', (request, response) => {
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
            response.status(500).send({ error : 'malformatted id' })
        })
})

app.delete('/api/persons/:id', (request, response) => {
    Contact.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end()
    })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const person = request.body
    console.log(request.body)
    if (!person) {
        return response.status(400).json(
            { error: 'Data missing from request' }
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
    }).catch(error => next(error))
    
})

app.put('/api/persons/:id', (request,response,next) => {
    const body = request.body

    const person = {
        number: body.number
    }
    
    Contact.findByIdAndUpdate(request.params.id, person, { new : true }).then(
        updatedNote => {
            response.json(updatedNote)
        }
    ).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError'){
        return response.status(400).send({ error : 'malformatted id' })
    }
    else if(error.name === 'ValidationError'){
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})