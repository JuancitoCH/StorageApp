const express = require('express')
const {port} = require('./config/env')
// routes
const files = require('./routes/files')
const user = require('./routes/users')
const auth = require('./routes/auth')

const app = express()

// middelwares
app.use(express.json())

// use Routes
files(app)
user(app)
auth(app)

app.get('/',(req,res)=>{
    return res.json({
        message:'Hola'
    })
})

app.listen(port,()=>{
    console.log('Liste on Port : http://localhost:' + port)
})