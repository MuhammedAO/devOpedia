const express = require('express');
const auth = require('../../middleware/auth');
const User = require ('../../model/User')
const router = express.Router();

router.get('/', auth, async(req,res) => {
    try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    }
    catch(err) {
     console.log(err.message);
     res.status(500).send('Internal server error');
    }
})

module.exports = router;