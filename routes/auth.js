const express = require('express')
const Auth = require('../services/auth')

const auth = (app)=>{
    const router = express.Router()
    const authService = new Auth()

    app.use('/api/auth',router)

    router.post('/login',async(req,res)=>{
        const response = await authService.login(req.body)

        return res.json(response)
    })
    router.post('/register',async(req,res)=>{
        const response = await authService.register(req.body)

        return res.json(response)
    })
}

module.exports = auth