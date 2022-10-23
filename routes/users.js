const entities = require('../entities/entities.js')
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/adduser', function(req, res, next) {
  entities.users.add(req.body)
  res.send('respond with a resource');
});
router.get('/', function(req, res, next) {
  console.log(entities.users)

  res.send(JSON.stringify([...entities.users]));
});
module.exports = router;
