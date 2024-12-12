const User = require('../models/user.model')
const {validationResult}  = require('express-validator')
const bcrypt = require("bcrypt")

const Resgister =  async( req , res ) =>{
    if (!validationResult(req).isEmpty()) {return res.status(400).json({ errors: validationResult(req).array() });}
    const { fullName, email, password } = req.body;

    try {
        const user  = await User.findOne({email})
        if(user){  return res.status(400).json({message : "User already Exist"})}

        const newUser = await User.create({
            email,
            fullName: {
                firstName : fullName.firstName,
                lastName : fullName.lastName
            },
            password 
        })
        const token = newUser.generateAuthToken();
        res.status(201).json({ token , message : "user created successfuly"})
    } catch (error) {
      res.status(500).json({message: "Error In Registration",error}) 
    }
}

const Login =  async( req , res ) =>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.cookie( "token" , token,{
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 3600000 
    });
    res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({message: "Error In Registration",error}) 
    }

}

const Logout =  async( req , res ) =>{
  
}

const Profile =  async( req , res ) =>{
    res.send("Profile")
}

module.exports = {
    Resgister,
    Login,
    Logout,
    Profile
}
