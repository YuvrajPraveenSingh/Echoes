const mongoose = require("mongoose")

const connect = async () => {
    await mongoose.connect(`${process.env.MongoDB_URI}`)
    .then(() =>{
        console.log("Connected to MongoDB")
    })
    .catch((error) =>{
        console.log("unable to connect " , error)
    })
}
module.exports = connect;