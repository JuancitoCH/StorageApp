const express = require('express')
const User = require('../services/users')


function user(app){
    const router = express.Router()
    const userService = new User()

    app.use('/api/users',router)

    router.get('/',async (req,res)=>{
        const user = await userService.getAll()
        return res.json(user)
    })
    router.post('/',async (req,res)=>{
        const user = await userService.create(req.body)
        return res.json(user)
    })


}
module.exports = user