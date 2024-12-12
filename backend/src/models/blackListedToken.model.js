const mongoose = require("mongoose")

const blackListedTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required: true,
        unique: true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires: 60*60*24  // 1hr
    }
})
const BlackListedToken = mongoose.model('BlackListedToken' , blackListedTokenSchema);
module.exports = BlackListedToken;