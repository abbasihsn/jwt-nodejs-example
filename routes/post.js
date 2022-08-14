const router = require('express').Router();
const verify = require('./verify.js')

router.get('/', verify, (req, res)=>{
    res.json({posts:{title: 'my first post', description: 'ranodm data'}})
})

module.exports = router; 