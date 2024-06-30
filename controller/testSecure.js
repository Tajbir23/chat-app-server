const express = require('express');
const verifyToken = require('../middleware/validUser');
const router = express.Router();

router.post('/', verifyToken, (req, res) => {
  res.send('Hello World!');
});

module.exports = router;