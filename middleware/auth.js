const jwt = require('jsonwebtoken');
const config = require('config');

//Protected route func
module.exports = (req,res,next) => {
    //get token from header
    const token = req.header('x-auth-token');

    //check for token
    if (!token) {
        return res.status(401).json({msg:'Unauthorized user'});
    }

    //verify token
    try {
     const decoded = jwt.verify(token, config.get('jwtSecret'));
     req.user = decoded.user
     next();
    }
    catch(err){
     res.status(401).json({msg:'Invalid token or expired'})
    }
}