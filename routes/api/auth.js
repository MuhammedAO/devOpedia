const express = require('express');
const auth = require('../../middleware/auth');
const User = require ('../../model/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require ('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
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
});

//Authenticate user, login & get token
router.post('/', [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Password is required').exists()
], async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    } 

    const {email, password} = req.body;
    //Check for existing user
    try {
        let user = await User.findOne({email});

        if(!user) {
        return res.status(400).json({errors:[{msg: 'Invalid Credentials'}]});
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
         return res.status(400).json({errors:[{msg: 'Invalid Credentials'}]});
        }



        //implement JWT
        const payload = {
            user:{
             id: user.id 
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:36000},
            (err, token) => {
              if (err) throw err;
              res.json({token});
            }
             );
       
    }
     catch (err) {
      console.log(err.message);
      res.status(500).send('Internal server error')
    }
    
})

module.exports = router;