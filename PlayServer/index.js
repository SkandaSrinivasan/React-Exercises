const express = require('express')

const app = express()

app.get('/', (req,response) => {
    response.send('<b>Skandaas</b>')
})

app.listen(3001, () => {
    console.log('Server running on 3001')
})