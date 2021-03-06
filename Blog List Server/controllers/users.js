const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(req, res) => {
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        username:body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await newUser.save()

    response.json(savedUser)
})

module.exports = usersRouter