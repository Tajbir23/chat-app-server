
const express = require('express');
const verifyToken = require('../middleware/validUser');
const createUser = require('../model/createUser');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    const {email} = req.body

    try {
        const profile = await createUser.findOne({email: email})
        res.send({profile})
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;