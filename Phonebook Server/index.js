const express = require('express')
const app = express()

const morgan = require('morgan')

app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
      'Server running on port:',
      `${PORT}`,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))

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


const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})


app.get('/info', (request,response) => {
    response.send(`<p>PhoneBook has info for ${persons.length} people</p>
    <p> Request for info was received on ${new Date()}`)
})

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request,response)=> {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.send(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    console.log(request.body)
    if(!person){
        return response.status(400).json(
            {error: "Data missing from request"}
        ).end()
    }
    else{
        console.log(person.name)
        console.log(person.number)
        if(!person.name || !person.number){
            return response.status(400).json(
                {error: "Person/Number missing from request"}
            ).end()
        }
        if(persons.some(p => p.name === person.name)){
            return response.status(400).json(
                {error: "Person name must be unique"}
            ).end()
        }

        const newPerson = {
            name: person.name,
            number: person.number,
            id: generateId()
        }
        persons = persons.concat(newPerson)
        return response.json(newPerson)
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const PORT = 3000
app.listen(PORT)