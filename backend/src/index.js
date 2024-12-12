const express =  require("express")
const dotenv = require("dotenv")
const connect = require("./db/db")
const cors = require('cors')
const cookie_parser = require('cookie-parser')
const authRoutes = require('./routes/auth.route')


dotenv.config();
const app = express()

app.use(express.json())
app.use(cors({
    origin: "*",
}))
app.use(cookie_parser())
app.use(express.urlencoded({extended : true }))


app.use('/api/v1/auth' , authRoutes )

app.listen(process.env.PORT , () =>{
    console.log(" Server is listening at , " , process.env.PORT )
    connect();
})

