
require('dotenv').config();
const crypto = require('crypto');
const express = require('express');
const findUser = require('../model/createUser');
const router = express.Router();
const jwt = require('jsonwebtoken')


router.post('/', async(req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    try {

        const cipher = crypto.createCipher('aes-256-cbc', process.env.PASSWORD_SECRET_KEY)
        let encrypted = await cipher.update(password, 'utf8', 'base64')
        encrypted += cipher.final('base64')
        
        const user = await findUser.findOne({email, password: encrypted})
        // console.log(encrypted)
        if(!user){
            return res.send({message: 'Invalid email or password'})
        }
        if(user.email === email && user.password === encrypted){

            const token = jwt.sign({name: user.name, email: user.email, image: user.image}, process.env.VERIFY_TOKEN_SECRET_KEY, { expiresIn: '1h' });
            return res.send({token})
        }
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;