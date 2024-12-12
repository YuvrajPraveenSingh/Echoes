const User = require('../models/user.model')
const BlackListedToken  = require('../models/blackListedToken.model')
const jwt = require('jsonwebtoken')

module.exports.authUser = async (req , res , next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){ return  res.status(401).json({message : " unauthorized  Acess"}) }

    const isBlackListedToken  = await BlackListedToken.findOne({token : token});
    if (isBlackListedToken){return  res.status(401).json({message : " unauthorized  Acess"})}
    try {
        const decode =  jwt.verify(token , process.env.JWT_SECRET);
        const user = await User.findById(decode._id);
        req.user = user;
        return next()
    } catch (error) {
        res.status(401).json({message : " unauthorized  Access"})
    }
}