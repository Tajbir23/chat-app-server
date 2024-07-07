require('dotenv').config()

const jwt = require('jsonwebtoken');

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
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, process.env.VERIFY_TOKEN_SECRET_KEY , (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }

        console.log('Decoded Token:', decoded);
        req.userInfo = decoded;
        next();
    });
};

module.exports = verifyToken;
