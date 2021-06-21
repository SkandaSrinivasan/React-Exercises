/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

//DB Connection
console.log('Process variables', process.env.DB_URI)
const url = process.env.DB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(_result => {
        console.log('connected to mongo dn')
    })
    .catch((error)=> {
        console.log('error connecting to db: ', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: {
        type:String,
        minLength: 3
    },
    number: String,
    date: Date
})

contactSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)