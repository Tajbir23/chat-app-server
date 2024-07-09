require('dotenv').config()

const jwt = require('jsonwebtoken');
const findUser = require('../model/createUser');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);
    // console.log(req)

    if (!authHeader) {
        return res.send({
            auth: false,
            message: 'No token provided.'
        });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
        return res.send({
            auth: false,
            message: 'No token provided.'
        });
    }

    try {
        jwt.verify(token, process.env.VERIFY_TOKEN_SECRET_KEY , async(err, decoded) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.send({
                    auth: false,
                    message: 'Failed to authenticate token.'
                });
            }
    
            console.log('Decoded Token:', decoded);

            const validUser = await findUser.findOne({email: decoded.email});

            if(!validUser || validUser.status === 'blocked'){
                return res.send({
                    auth: false,
                    message: 'User not found.'
                });
            }

            req.userInfo = decoded;
            next();
        });
    } catch (error) {
        res.send({
            auth: false,
            message: 'Failed to authenticate token.'
        })
    }
};

module.exports = verifyToken;
