const express = require('express')
const { isAmdmin } = require('../middleware/auth')
const User = require('../services/users')


function user(app){
    const router = express.Router()
    const userService = new User()

    app.use('/api/users',router)

    router.get('/',isAmdmin,async (req,res)=>{
        const user = await userService.getAll()
        return res.json(user)
    })
    router.post('/',isAmdmin,async (req,res)=>{
        const user = await userService.create(req.body)
        return res.json(user)
    })
    router.delete('/:id',isAmdmin,async (req,res)=>{
        const user = await userService.delete(req.params.id)
        return res.json(user)
    })


}
module.exports = user