const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema =  new  mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique: true,
    },
    fullName: {
        firstName :{
            type : String,
            required: true,
        },
        lastName:{
            type : String,
            required: true,
        }
    },
    password: {
        type: String,
        require:true,
        minlength:[8 , 'password is too short'],
        select: false
    },
    isActive:{
        type: Boolean,
        default: false,
    },
    profilePic: {
        type: String,
        default: '',
    },
    refreshToken: {
        type: String,
    },
},{timestamps : true}
);


userSchema.pre('save' , async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id} , process.env.JWT_SECRET , { expiresIn : '1h'})
    return token
} 

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User" , userSchema);
module.exports = User