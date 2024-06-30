const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
        return res.status(403).send({
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

    jwt.verify(token, 'PmhpxQ469cs5E9I26hvvV1MOGriibHl75SG3Q5edsgc', (err, decoded) => {
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
