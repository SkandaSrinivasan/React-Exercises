const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log("gimme a password : node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://skanda:${password}@cluster0.zpqcb.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false,useCreateIndex:true})
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content:"Mongo test note",
    date: new Date()
})

// note.save().then(result => {
//     console.log('note saved')
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})