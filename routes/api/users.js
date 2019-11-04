const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Welcome to users API');
})

module.exports = router;