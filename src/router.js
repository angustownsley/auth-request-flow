const express = require('express')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const router = express.Router()

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43,
    },
}

router.post('/login', (req, res) => {
    const { username , password} = req.body
    if(mockUser.username !== username || mockUser.password !== password) {
        return res.status(403).send({ error: 'Access Forbidden' }) 
    }
    const payload = { header: 'Header', payload: username }
    return res.status(201).send({ token: jwt.sign(payload, secret) })
})

router.get('/profile', (req, res) => {
    const parsedAuth = req.headers.authorization.replace('Bearer ', '')

    try {
        jwt.verify(parsedAuth, secret)
        return res.send({ profile: mockUser })
    } catch (e) {
        return res.status(403).send({ error: 'Access Forbidden' })
    }
})

module.exports = router
