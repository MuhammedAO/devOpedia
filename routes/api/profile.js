const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const User = require('../../model/User');
const router = express.Router();

router.get('/me', auth, async (req,res) => {
    try{
    const profile = await Profile.findOne({user:req.user.id}).populate('user', ['name', 'avatar']);
    if(!profile) {
        return res.status(400).json({msg:'There is no profile for this user'});
    }
    res.json(profile);
    }
    catch(err){
    console.log(err.message);
    res.status(500).send('Internal server error');
    }
})

module.exports = router;