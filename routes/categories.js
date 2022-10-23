const entities = require('../entities/entities.js')
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/addcategory', function(req, res, next) {
    if (!req.body.id){
        return res.send('no id provided')
    }
    if (!req.body.name){
        return res.send('no name provided')
    }
    entities.categories.add(req.body)
    res.send('categories respond with a resource');
});
router.get('/', function(req, res, next) {
    res.send(JSON.stringify([...entities.categories]));
});
module.exports = router;
