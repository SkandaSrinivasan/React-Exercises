const mongoose = require('mongoose')


const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://skanda:${password}@cluster0.zpqcb.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false,useCreateIndex:true})



const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})

const Contact = mongoose.model('Contact', contactSchema)

const newContact = new Contact({
    name: newName,
    number: newNumber,
    date: new Date()
})

newContact.save().then(result => {
    console.log("Contact saved")
    mongoose.connection.close()
})


    Contact.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
