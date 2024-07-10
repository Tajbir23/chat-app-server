require('dotenv').config();
const express = require('express');
const createUser = require('../model/createUser');
const crypto = require('crypto')
const router = express.Router();

router.post('/', async (req, res) => {
    const {name, email, password, image} = req.body

    console.log(image)
    // const imageUrl = 'https://avatars.dicebear.com/api/initials/' + name + '.svg'

    const cipher = crypto.createCipher('aes-256-cbc', process.env.PASSWORD_SECRET_KEY)
    let encrypted = await cipher.update(password, 'utf8', 'base64')
    encrypted += cipher.final('base64')

    
    try {
        // Check if user already exists
        const existingUser = await createUser.findOne({ email })
        if (existingUser) {
            console.log(existingUser, 'user already exists')
            return res.send({ message: 'User already exists' });
        }
        const user = await createUser.create({
            name,
            email,
            password: encrypted,
            image
        })

        console.log(user)
        
        res.status(200).json({ message: 'Hello from the server!', user });
    } catch (error) {
        console.log(error.message)
    }
    
})

module.exports = router