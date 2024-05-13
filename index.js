const express = require('express')
const app = express()
app.use(express.json())

require('dotenv').config()

const Person = require('./models/person')

const morgan = require('morgan')
morgan.token('req-body', function (req, res) {
    return JSON.stringify(req['body'])})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})


app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    
    Person.findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            }
            else {
                response.status(404).end()
            }    
        })
})

//Ei toimi vielä
/*
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(person => person.id !== id)
    response.status(204).end()
})
*/

generateRandomId = () => {
    return Math.floor(Math.random() * 10000)
} 

app.post('/api/persons/', (request, response) => {
    const body = request.body
    
    /*
    const names = phonebook.map(person =>person.name)
    if (names.includes(body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'Name and number missing'
        })
    }
    
    else if (!body.name) {
        return response.status(400).json({
            error: 'Name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'Number missing'
        })
    }
    */

    const person = new Person ({
        id: generateRandomId(),
        name: body.name,
        number: body.number,
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

//Ei toimi vielä
/*
app.get('/info', (request, response) => {
    const datetime = new Date(Date.now()).toString()
    const info =
    `
    <p>Phonebook has info for ${phonebook.length} people.</p>
    <p>${datetime}</p>
    `
    response.send(info)
})
*/

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })