const express = require('express')
const {port} = require('./config/env')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// routes
const files = require('./routes/files')
const folders = require('./routes/folders')
const user = require('./routes/users')
const auth = require('./routes/auth')
const subscriptions = require('./routes/subscriptions')


const app = express()

// middelwares
app.use(cors({
    origin:['4000']
}))
app.use(express.json())
app.use(cookieParser())

// use Routes
folders(app)
files(app)
user(app)
auth(app)
subscriptions(app)

app.get('/',(req,res)=>{
    return res.json({
        message:'Hola'
    })
})

app.listen(port,()=>{
    console.log('Liste on Port : http://localhost:' + port)
})