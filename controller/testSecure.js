const express = require('express');
const verifyToken = require('../middleware/validUser');
const router = express.Router();

router.post('/', verifyToken, async(req, res) => {
  const decoded = req.userInfo
  console.log(decoded)
  res.send({ auth: true, decoded });
});

module.exports = router;