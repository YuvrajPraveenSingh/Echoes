const User = require('../models/user.model')
const {validationResult}  = require('express-validator')

const Resgister =  async( req , res ) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {return res.status(400).json({ errors: errors.array() });}
    const { fullName, email, password } = req.body;

    try {
        const user  = await User.findOne({email})
        if(user){  return res.status(400).json({message : "User already Exist"})}

        const hashedPassword = await User.hashedPassword(password);
        const newUser = await User.create({
            email : email,
            fullName: {
                firstName : fullName.firstName,
                lastName : fullName.lastName
            },
            password : hashedPassword,
        })
        const token = newUser.generateAuthToken();
        res.status(201).json({ token})
        
    } catch (error) {
      console.log("Error In  Registration " , error)
      res.status(500).json({
         message: "Error In  Registration",
         error
      }) 
    }
}

const Login =  async( req , res ) =>{
    res.send("Login")
}

const Logout =  async( req , res ) =>{
    res.send("Logout")
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
